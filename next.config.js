const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");
const isProd = process.env.NODE_ENV === "production";

module.exports = withCSS(
  withOffline({
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

    workboxOpts: {
      runtimeCaching: [
        {
          urlPattern: /.png$/,
          handler: "CacheFirst",
        },
        {
          urlPattern: /api/,
          handler: "NetworkFirst",
          options: {
            cacheableResponse: {
              statuses: [0, 200],
              headers: {
                "x-test": "true",
              },
            },
          },
        },
      ],
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
  })
);
