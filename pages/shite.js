// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const ShitePage = () => (
  <Page displayHeader={true} title="This is a shite page">
    <div className="content-wrap landing-content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>

        <h1 id="single-title" className="animated bounceInDown">
          <span className="emoji">💩</span>I don't really know what to do with
          this domain...
        </h1>
        <div className="title-button-wrap">
          <a
            className="ui button white basic inverted"
            href="https://nicholasgriffin.dev"
          >
            Check out my homepage instead?
          </a>
        </div>
      </div>
    </div>
  </Page>
);

export default ShitePage;
