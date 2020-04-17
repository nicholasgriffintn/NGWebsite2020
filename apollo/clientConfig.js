import { InMemoryCache } from "apollo-cache-inmemory";
import { config } from "../../config/config";

export default function(context) {
  return {
    httpLinkOptions: {
      uri: config.websiteUrl + config.graphqlPath,
      credentials: "same-origin"
    },
    cache: new InMemoryCache(),
    wsEndpoint: config.websocketUrl + config.graphqlPath
  };
}
