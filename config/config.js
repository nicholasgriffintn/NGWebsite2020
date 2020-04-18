require("dotenv").config();

const packageJson = require("../package.json");
const manifest = require("../public/manifest.json");

const appSlug = "ng_personal_site";
const serverPort = process.env.PORT || 3123;

const completeConfig = {
  default: {
    serverPort,
    appSlug,
    websocketUrl: process.env.WEBSITE_URL || "ws://nicholasgriffin.dev",
    websiteUrl: process.env.WEBSITE_URL || "https://nicholasgriffin.dev",
    appUrl: process.env.APP_URL || "https://nicholasgriffin.dev/",
    appName: manifest.name,
    appTagline: "My awesome personal website",
    appDescription: packageJson.description,
    appKeywords: "It's a website, that's just for me.",
    mainSocialImageURL: "/meta/social-share.png",
    locale: "en_GB",
    graphqlPath: "/api/graphql",
    googleAnalyticsId: "GTM-NK46QBJ",

    REDIS: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || "6379",
    },

    AUTH: {
      UserPoolId: process.env.USER_POOL_ID || "eu-west-2_Pv8aYwUfA",
      ClientId: process.env.USER_POOL_CLIENT_ID || "2nqiksvvpvea3v3im9kl9ce2e5",
    },

    DATABASE: {
      username: process.env.DATABASE_USERNAME || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_NAME || appSlug,
      host: process.env.DATABASE_URL || `localhost:5432`,
      dialect: "postgres",
      operatorsAliases: false,
      logging: false,
    },
  },

  development: {
    websiteUrl: `http://localhost:${serverPort}`,
    appUrl: `http://localhost:${serverPort}/`,
    googleAnalyticsId: null,
    websocketUrl: process.env.WEBSITE_URL || "ws://localhost:${serverPort}",
  },

  production: {
    websiteUrl: `https://nicholasgriffin.dev`,
    appUrl: `https://nicholasgriffin.dev/`,
    googleAnalyticsId: "GTM-NK46QBJ",
    websocketUrl: process.env.WEBSITE_URL || "ws://nicholasgriffin.dev",
  },
};

// Public API
module.exports = {
  config: {
    ...completeConfig.default,
    ...completeConfig[process.env.NODE_ENV],
  },
  completeConfig,
};
