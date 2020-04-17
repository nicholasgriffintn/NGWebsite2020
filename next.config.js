const withCSS = require("@zeit/next-css");
const isProd = process.env.NODE_ENV === "production";

module.exports = withCSS({
  mode: "universal",
  loading: { color: "#19034e" },

  plugins: [],

  modules: ["@nuxtjs/apollo"],

  apollo: {
    cookieAttributes: {
      expires: 7,
    },
    includeNodeModules: true,
    authenticationType: "Bearer",
    errorHandler: "~/plugins/apollo-error-handler.js",
    clientConfigs: {
      default: "~/apollo/clientConfig.js",
    },
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
  poweredByHeader: false,
});
