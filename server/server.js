require('dotenv').config();

const next = require('next');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const server = express();
const path = require('path');

const bearerToken = require('express-bearer-token');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = app.getRequestHandler();
const { config } = require('../config/config');

// Apollo GraphQL
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const models = require('../models');

const multer = require('multer');
const aws = require('aws-sdk');
const fs = require('fs');

const resize = require('./resize');

const Redis = require('ioredis');
const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

const rateLimit = require('express-rate-limit');

const speakeasy = require('speakeasy');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: { models },
});
apolloServer.applyMiddleware({ app: server, path: config.graphqlPath });

const rss = require('rss');
const dayjs = require('dayjs');

// Routes
app.prepare().then(() => {
  // Add headers
  server.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      req.header && req.header('Origin') ? req.header('Origin') : '*'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,authorization,type,Origin,Content-Type,Accept,Authorization,Access-Control-Allow-Credentials'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('x-frame-options', 'SAMEORIGIN');
    res.setHeader('x-content-type-options', 'nosniff');

    res.setHeader('X-Server', `NG-API`);

    next();
  });

  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Prevent HTTP parameter pollution
  server.use(hpp());

  server.set('trust proxy', 1);
  server.disable('x-powered-by');

  // Middlewares

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  server.use(bearerToken());

  // Validate token
  async function validateAccessToken(token) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://cognito-idp.eu-west-2.amazonaws.com/${config.AUTH.UserPoolId}/.well-known/jwks.json`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
          const body = response.data;
          let pems = {};
          const keys = body['keys'];
          keys.forEach((key) => {
            const keyId = key.kid;
            const modulus = key.n;
            const exponent = key.e;
            const keyType = key.kty;
            const jwk = { kty: keyType, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            pems[keyId] = pem;
          });
          const decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            reject('No token could be decoded');
          }
          const kid = decodedJwt['header'].kid;
          const pem = pems[kid];
          if (!pem) {
            reject('No token supplied');
          }
          jwt.verify(token, pem, (err, payload) => {
            if (err) {
              reject(err);
            } else {
              resolve(pem);
            }
          });
        });
    });
  }

  // Authentication
  function checkUser(req, res, next) {
    // get  the token from headers
    let accessTokenFromClient = req.token;

    //Fail if token not present in header.
    if (!accessTokenFromClient) {
      return res.status(401).send({
        status: 'error',
        message: 'no access token',
      });
    }

    validateAccessToken(accessTokenFromClient)
      .then((data) => {
        if (data) {
          res.locals.user = data;
          next();
        } else {
          return res.status(401).send({
            status: 'error',
            message: err,
          });
        }
      })
      .catch((err) => {
        return res.status(401).send({
          status: 'error',
          message: err,
        });
      });
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  const imageLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
  });

  // API Routes
  server.get('/feed', limiter, async function (req, res) {
    // Create rss prototype object and set some base values
    var feed = new rss({
      title: 'Nicholas Griffin',
      description: 'My personal website',
      feed_url: 'https://nicholasgriffin.dev' + req.url,
      site_url: 'https://nicholasgriffin.dev',
      image_url: 'https://nicholasgriffin.dev/icon.png',
      author: 'Nicholas Griffin',
    });

    let where = {};

    const rssFeedArticles = await models.article
      .cache(`all-articles-rss-feed`)
      .findAll({
        where,
        offset: 0,
        limit: 6,
        order: [['createdAt', 'desc']],
      });

    if (rssFeedArticles) {
      rssFeedArticles.forEach(function (post) {
        feed.item({
          title: post.title,
          description: post.description,
          url: 'http://nicholas.griffin.dev/post-single/' + post.id,
          author: 'Nicholas Griffin',
          date: dayjs(post.createdAt).format('dddd, MMMM D YYYY h:mm a'),
        });
      });

      res.type('rss');
      res.send(feed.xml());
    } else {
      res.send(rssFeedArticles);
    }
  });

  server.get('/api/spotify', limiter, async function (req, res) {
    redis.get('spotify-data', function (err, result) {
      var request = require('request');

      var options = {
        url: 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=NGriiffin&api_key=c91dd1f9b8fcf710e36a2a48c6c493a8&limit=10&format=json',
        method: 'GET',
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          redis.set('spotify-data', body, 'ex', 500);

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

  server.get('/api/github', limiter, async function (req, res) {
    redis.get('spotify-data', function (err, result) {
      var request = require('request');

      var options = {
        url: 'https://api.github.com/users/nicholasgriffintn/repos?sort=updated&type=owner',
        method: 'GET',
        headers: {
          'User-Agent': 'Nicholas-Griffin-App',
        },
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          redis.set('github-data', body, 'ex', 500);

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

  server.get('/api/images/resize', imageLimiter, async (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width;
    const heightString = req.query.height;
    const format = req.query.format || 'png';
    const image = req.query.image ? 'images/' + req.query.image : 'icon.png';
    const fit = req.query.fit || 'cover';
    const position = req.query.position || 'centre';

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
      res.type(`image/${format || 'png'}`);

      var imageResizedBase = Buffer.from(imageResized, 'base64');

      res.end(imageResizedBase);
    } else {
      // Set the content-type of the response
      res.type(`application/json"}`);

      res.send(imageResizedBase);
    }
  });

  server.post(
    `/api/admin/media`,
    checkUser,
    multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single(
      'image'
    ),
    async function (req, res) {
      try {
        req.apicacheGroup = 'content-api';

        if (
          res.locals.user &&
          res.locals.user.sub === 'e885ab87-0a49-43d6-95cb-7ddc8d4e1149'
        ) {
          if (req.body && req.body.mediatype && req.body.title) {
            async function uploadTheFIle(req, res, cognitoResponse) {
              aws.config.setPromisesDependency();
              aws.config.update({
                accessKeyId: process.env.ACCESSKEYID,
                secretAccessKey: process.env.SECRETACCESSKEY,
                region: process.env.REGION,
              });
              const s3 = new aws.S3();

              const fileData = req.file;

              var params = {
                ACL: 'public-read',
                Bucket: process.env.BUCKET_NAME,
                Body: fs.createReadStream(req.file.path),
                Key: `mediaUploads/${cognitoResponse.sub}/${req.file.originalname}`,
                ContentType: fileData.mimetype || 'image/png',
              };

              s3.upload(params, async (err, data) => {
                if (err) {
                  console.log(
                    'Error occured while trying to upload to S3 bucket',
                    err
                  );
                }

                if (data) {
                  fs.unlinkSync(req.file.path); // Empty temp folder

                  const record = await models.media.create({
                    mediatype: req.body.mediatype || 'image',
                    title: req.body.title || null,
                    description: req.body.description || null,
                    s3bucketname: data.Bucket || 'cdn.nicholasgriffin.dev',
                    s3key: data.key || data.Key || null,
                    s3etag: data.ETag || null,
                    s3location: data.Location || null,
                    filename: fileData.filename || null,
                    originalname: fileData.originalname || null,
                    encoding: fileData.encoding || null,
                    mimetype: fileData.mimetype || 'image',
                    size: fileData.size || req.body.size || null,
                    width: fileData.width || req.body.width || null,
                    height: fileData.height || req.body.height || null,
                  });
                  res.status(200).json({ record });
                }
              });
            }

            uploadTheFIle(req, res, response);
          } else {
            console.log(req.body);
            console.log(req.file);
            res.status(500).json({ error: 'Incorrect params' });
          }
        } else {
          res.status(403).json({ error: 'Forbidden' });
        }
      } catch (error) {
        throw error;
      }
    }
  );

  server.get(`/api/have-i-been-pwned`, limiter, async function (req, res) {
    req.apicacheGroup = 'haveibeenpwned-api';

    if (req.query && req.query.account) {
      try {
        var request = require('request');

        var HIBP_API_KEY = process.env.HIBP_API_KEY || '';

        var options = {
          url: `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
            req.body.account
          )}?truncateResponse=false`,
          method: 'GET',
          headers: {
            'User-Agent': 'Nicholas-Griffin-App',
            'hibp-api-key': HIBP_API_KEY,
          },
        };

        function callback(error, response, body) {
          if (!error && response.statusCode == 200) {
            redis.set(
              `hibp-data-${encodeURIComponent(req.body.account)}`,
              body,
              'ex',
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
      res.status(403).json({ error: 'Not allowed' });
    }
  });

  server.post(
    `/api/admin/two-factor`,
    checkUser,
    limiter,
    async function (req, res) {
      if (
        res.locals.user &&
        res.locals.user.sub === 'e885ab87-0a49-43d6-95cb-7ddc8d4e1149'
      ) {
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
        res.status(403).json({ error: 'Not allowed' });
      }
    }
  );

  server.post(
    `/api/admin/verify-two-factor`,
    limiter,
    async function (req, res) {
      if (
        res.locals.user &&
        res.locals.user.sub === 'e885ab87-0a49-43d6-95cb-7ddc8d4e1149'
      ) {
        try {
          const userData = await models.user.findByPk(response.sub);
          if (userData) {
            const userSecret = userData.two_factor_secret;

            const userVerfied = speakeasy.totp.verify({
              secret: userSecret,
              encoding: 'base32',
              token: req.body.twofactor,
            });

            if (userVerfied) {
              await models.user.update(
                {
                  two_factor_enabled: true,
                },
                { where: { id: response.sub } }
              );

              res.status(200).json({ status: 'Verified' });
            } else {
              res.status(500).json({
                error: 'User not verified',
                status: 'Unverified',
              });
            }
          } else {
            res.status(500).json({ error: 'User not found' });
          }
        } catch (error) {
          console.error(error);

          res.status(500).json({ error: error });
        }
      } else {
        res.status(403).json({ error: 'Not allowed' });
      }
    }
  );

  server.post(
    `/api/admin/clear-redis-cache`,
    checkUser,
    limiter,
    async function (req, res) {
      req.apicacheGroup = 'content-api';

      if (
        res.locals.user &&
        res.locals.user.sub === 'e885ab87-0a49-43d6-95cb-7ddc8d4e1149'
      ) {
        try {
          // "model:article:all-articles-hp"
          // "model:article:project-ng-2020-building-an-express-image-resizing-api"
          if (req.query.cache) {
            await redis.del(req.query.cache);

            res.status(200).json({ error: 'Cache cleared' });
          } else {
            res.status(403).json({ error: 'No cache name provided.' });
          }
        } catch (error) {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(403).json({ error: 'Not allowed' });
      }
    }
  );

  server.post(
    `/api/admin/content`,
    checkUser,
    limiter,
    async function (req, res) {
      req.apicacheGroup = 'content-api';

      if (
        res.locals.user &&
        res.locals.user.sub === 'e885ab87-0a49-43d6-95cb-7ddc8d4e1149'
      ) {
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
            res.status(500).json({ error: 'Incorrect params' });
          }
        } catch (error) {
          res.status(500).json({ error: error });
        }
      } else {
        res.status(403).json({ error: 'Not allowed' });
      }
    }
  );

  // Static assets
  server.use('/public', express.static(path.join(__dirname, '../public')));

  // Next.js page routes
  server.all('*', requestHandler);

  server.use((req, res, next) => {
    const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

    error.statusCode = 404;

    next(error);
  });

  server.use((err, req, res, next) => {
    const { statusCode, message } = err;

    if (statusCode !== 404) {
      console.error(message);
    }

    return res.status(statusCode ? Number(statusCode) : 500).send({
      status: {
        type: 'error',
        id: 'InternalServerError',
      },
    });
  });

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
