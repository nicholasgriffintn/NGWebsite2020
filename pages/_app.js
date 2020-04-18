import React from "react";
import App from "next/app";
//import Router from "next/router";

import withData from "../components/utils/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";

/* import { googlePageview } from "../components/GoogleAnalytics";

Router.events.on("routeChangeComplete", path => googlePageview(path)); */

class Website extends App {
  componentDidMount = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceworker.js")
        .catch((err) =>
          console.error("Service worker registration failed", err)
        );
    } else {
      console.log("Service worker not supported");
    }
  };

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
