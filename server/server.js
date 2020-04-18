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

  // API Routes
  server.post(`/api/content`, async function (req, res) {
    if (req.token) {
      cognitoExpress.validate(req.token, async function (err, response) {
        if (err || !response) {
          res.status(403).json({ error: "Token invalid" });
        } else {
          console.log(response);

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

                return record;
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
