// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const SignupPage = () => (
  <Page displayHeader={true} title="This is a shite page">
    <div className="content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>

        <h1 id="single-title" className="animated bounceInDown">
          No signup anymore...
        </h1>
        <h2>Sorry, I broke it.</h2>
        <p>Maybe later?</p>
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

export default SignupPage;
