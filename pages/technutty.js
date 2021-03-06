// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const TechNuttyPage = () => (
  <Page displayHeader={true} title="TechNutty">
    <div className="content-wrap landing-content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>

        <h1 id="single-title" className="animated bounceInDown">
          Hey! I see that you have come for my old site TechNutty.
        </h1>
        <p>
          Sorry to say but I decided that I would stop my management of that
          site back in 2011, I am now focusing on web development and other
          interesting projects.
        </p>
        <div className="title-button-wrap">
          <a
            className="ui button white basic inverted"
            href="https://nicholasgriffin.dev"
          >
            Find out more
          </a>
        </div>
      </div>
    </div>
  </Page>
);

export default TechNuttyPage;
