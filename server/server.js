require("dotenv").config();

const bodyParser = require("body-parser");
const next = require("next");
const express = require("express");
const server = express();
const path = require("path");

const bearerToken = require("express-bearer-token");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const requestHandler = app.getRequestHandler();
const { config } = require("../config/config");

// Apollo GraphQL
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");
const models = require("../models");

const resize = require("./resize");

const Redis = require("ioredis");
const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

const rateLimit = require("express-rate-limit");

const speakeasy = require("speakeasy");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: { models },
});
apolloServer.applyMiddleware({ app: server, path: config.graphqlPath });

const CognitoExpress = require("cognito-express");

const cognitoExpress = new CognitoExpress({
  region: "eu-west-2",
  cognitoUserPoolId: config.AUTH.UserPoolId,
  tokenUse: "id",
});

// Routes
app.prepare().then(() => {
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use(bearerToken());

  // Allows for cross origin domain request:
  server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });

  server.set("trust proxy", 1);

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  const imageLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
  });

  // API Routes
  server.get("/api/spotify", limiter, async function (req, res) {
    redis.get("spotify-data", function (err, result) {
      var request = require("request");

      var options = {
        url:
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=NGriiffin&api_key=c91dd1f9b8fcf710e36a2a48c6c493a8&limit=10&format=json",
        method: "GET",
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          redis.set("spotify-data", body, "ex", 500);

          res.status(200).json({ body });
        } else {
          res
            .status(500)
            .json({ error: error, response: response, body: body });
        }
      }

      request(options, callback);
    });
  });

  server.get("/api/github", limiter, async function (req, res) {
    redis.get("spotify-data", function (err, result) {
      var request = require("request");

      var options = {
        url:
          "https://api.github.com/users/nicholasgriffintn/repos?sort=updated&type=owner",
        method: "GET",
        headers: {
          "User-Agent": "Nicholas-Griffin-App",
        },
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          redis.set("github-data", body, "ex", 500);

          res.status(200).json({ body });
        } else {
          res
            .status(500)
            .json({ error: error, response: response, body: body });
        }
      }

      request(options, callback);
    });
  });

  server.get("/api/images/resize", imageLimiter, async (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width;
    const heightString = req.query.height;
    const format = req.query.format || "png";
    const image = req.query.image ? "images/" + req.query.image : "icon.png";
    const fit = req.query.fit || "cover";
    const position = req.query.position || "centre";

    // Parse to integer if possible
    let width, height;
    if (widthString) {
      width = parseInt(widthString);
    }
    if (heightString) {
      height = parseInt(heightString);
    }

    // Get the resized image
    const imageResized = await resize(
      image,
      format,
      width,
      height,
      fit,
      position
    );

    if (imageResized && !imageResized.statusCode) {
      // Set the content-type of the response
      res.type(`image/${format || "png"}`);

      var imageResizedBase = Buffer.from(imageResized, "base64");

      res.end(imageResizedBase);
    } else {
      // Set the content-type of the response
      res.type(`application/json"}`);

      res.send(imageResizedBase);
    }
  });

  server.get(`/api/have-i-been-pwned`, limiter, async function (req, res) {
    req.apicacheGroup = "haveibeenpwned-api";

    if (req.query && req.query.account) {
      try {
        var request = require("request");

        var HIBP_API_KEY = process.env.HIBP_API_KEY || "";

        var options = {
          url: `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
            req.body.account
          )}?truncateResponse=false`,
          method: "GET",
          headers: {
            "User-Agent": "Nicholas-Griffin-App",
            "hibp-api-key": HIBP_API_KEY,
          },
        };

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            redis.set(
              `hibp-data-${encodeURIComponent(req.body.account)}`,
              body,
              "ex",
              500
            );

            res.status(200).json(JSON.parse(body));
          } else {
            res
              .status(500)
              .json({ error: error, response: response, body: body });
          }
        }

        request(options, callback);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    } else {
      res.status(403).json({ error: "Not allowed" });
    }
  });

  server.post(`/api/admin/two-factor`, limiter, async function (req, res) {
    if (req.token) {
      cognitoExpress.validate(req.token, async function (err, response) {
        if (err || !response) {
          res.status(403).json({ error: "Token invalid" });
        } else {
          if (response.sub === "e885ab87-0a49-43d6-95cb-7ddc8d4e1149") {
            try {
              const genSecret = speakeasy.generateSecret();

              const genSecretBase = genSecret.base32;

              const genSecretURL = genSecret.otpauth_url;

              async function updateOrCreate(model, where, newItem) {
                // First try to find the record
                const foundItem = await model.findOne({ where });
                if (!foundItem) {
                  // Item not found, create a new one
                  const item = await model.create(newItem);
                  return { item, created: true };
                }
                // Found an item, update it
                const item = await model.update(newItem, { where });
                return { item, created: false };
              }

              await updateOrCreate(
                models.user,
                { id: response.sub },
                {
                  id: response.sub,
                  two_factor_secret: genSecretBase,
                }
              );

              res
                .status(200)
                .json({ secret: genSecretBase, secretURL: genSecretURL });
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: error });
            }
          } else {
            res.status(403).json({ error: "Not allowed" });
          }
        }
      });
    }
  });

  server.post(`/api/admin/verify-two-factor`, limiter, async function (
    req,
    res
  ) {
    if (req.token) {
      cognitoExpress.validate(req.token, async function (err, response) {
        if (err || !response) {
          res.status(403).json({ error: "Token invalid" });
        } else {
          if (response.sub === "e885ab87-0a49-43d6-95cb-7ddc8d4e1149") {
            try {
              const userData = await models.user.findByPk(response.sub);
              if (userData) {
                const userSecret = userData.two_factor_secret;

                const userVerfied = speakeasy.totp.verify({
                  secret: userSecret,
                  encoding: "base32",
                  token: req.body.twofactor,
                });

                if (userVerfied) {
                  await models.user.update(
                    {
                      two_factor_enabled: true,
                    },
                    { where: { id: response.sub } }
                  );

                  res.status(200).json({ status: "Verified" });
                } else {
                  res
                    .status(500)
                    .json({ error: "User not verified", status: "Unverified" });
                }
              } else {
                res.status(500).json({ error: "User not found" });
              }
            } catch (error) {
              console.error(error);

              res.status(500).json({ error: error });
            }
          } else {
            res.status(403).json({ error: "Not allowed" });
          }
        }
      });
    }
  });

  server.post(`/api/admin/clear-redis-cache`, limiter, async function (
    req,
    res
  ) {
    if (req.token) {
      cognitoExpress.validate(req.token, async function (err, response) {
        if (err || !response) {
          res.status(403).json({ error: "Token invalid" });
        } else {
          req.apicacheGroup = "content-api";

          if (response.sub === "e885ab87-0a49-43d6-95cb-7ddc8d4e1149") {
            try {
              // "model:article:all-articles-hp"
              // "model:article:project-ng-2020-building-an-express-image-resizing-api"
              if (req.query.cache) {
                await redis.del(req.query.cache);

                res.status(200).json({ error: "Cache cleared" });
              } else {
                res.status(403).json({ error: "No cache name provided." });
              }
            } catch (error) {
              res.status(500).json({ error: error });
            }
          } else {
            res.status(403).json({ error: "Not allowed" });
          }
        }
      });
    }
  });

  server.post(`/api/admin/content`, limiter, async function (req, res) {
    if (req.token) {
      cognitoExpress.validate(req.token, async function (err, response) {
        if (err || !response) {
          res.status(403).json({ error: "Token invalid" });
        } else {
          req.apicacheGroup = "content-api";

          if (response.sub === "e885ab87-0a49-43d6-95cb-7ddc8d4e1149") {
            try {
              if (
                req.body &&
                req.body.slug &&
                req.body.title &&
                req.body.description &&
                req.body.tags &&
                req.body.thumbnail &&
                req.body.header &&
                req.body.content
              ) {
                const postData = await models.article.findByPk(req.body.slug);
                if (postData) {
                  const record = await models.article.update(
                    {
                      id: req.body.slug,
                      title: req.body.title,
                      published: req.body.published || false,
                      description: req.body.description,
                      tags: req.body.tags,
                      thumbnail: req.body.thumbnail,
                      header: req.body.header,
                      content: req.body.content,
                    },
                    { where: { id: req.body.slug } }
                  );

                  await redis.del(`model:article:${req.body.slug}`);

                  res.status(200).json({ record });
                } else {
                  const record = await models.article.create({
                    id: req.body.slug,
                    title: req.body.title,
                    published: req.body.published || false,
                    description: req.body.description,
                    tags: req.body.tags,
                    thumbnail: req.body.thumbnail,
                    header: req.body.header,
                    content: req.body.content,
                  });
                  res.status(200).json({ record });
                }
              } else {
                res.status(500).json({ error: "Incorrect params" });
              }
            } catch (error) {
              res.status(500).json({ error: error });
            }
          } else {
            res.status(403).json({ error: "Not allowed" });
          }
        }
      });
    } else {
      res.status(403).json({ error: "Token invalid" });
    }
  });

  // Static assets
  server.use("/public", express.static(path.join(__dirname, "../public")));

  // Next.js page routes
  server.all("*", requestHandler);

  // Start server
  server.listen(config.serverPort, () =>
    console.log(
      `[${new Date().getHours()}:${new Date().getMinutes()}] ${
        config.appSlug
      } running on http://localhost:${
        config.serverPort
      }/ GraphQL on http://localhost:${config.serverPort}${
        apolloServer.graphqlPath
      }`
    )
  );
});
