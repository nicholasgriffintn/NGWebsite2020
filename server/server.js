require("dotenv").config();

const bodyParser = require("body-parser");
const next = require("next");
const express = require("express");
const server = express();
const path = require("path");

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

// Routes

app.prepare().then(() => {
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

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
