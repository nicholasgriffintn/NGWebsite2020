// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const OfflinePage = () => (
  <Page displayHeader={true} title="Offline">
    <div className="content-wrap landing-content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>

        <h1 id="single-title" className="animated bounceInDown">
          You are offline right now
        </h1>
        <h2>If you saved this page then you'd be able read it right now.</h2>
        <p>Sadly, you didn't do that. Maybe next time?</p>
        <div className="title-button-wrap">
          <a
            className="ui button white basic inverted"
            href="https://nicholasgriffin.dev"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  </Page>
);

export default OfflinePage;
