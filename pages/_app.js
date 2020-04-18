import React from "react";
import App from "next/app";
//import Router from "next/router";

import withData from "../components/utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";

/* import { googlePageview } from "../components/GoogleAnalytics";

Router.events.on("routeChangeComplete", path => googlePageview(path)); */

class Website extends App {
  render() {
    const { Component, pageProps, router, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} {...router} />
      </ApolloProvider>
    );
  }
}

export default withData(Website);
