// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";
import ArticleList from "../components/ArticleList";

const SignupPage = ({ query }) => (
  <Page displayHeader={true} title="This is a blog page">
    <div className="content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>

        <h1
          id="single-title"
          className="animated bounceInDown title-center blog-title"
        >
          Blog
        </h1>
        <div className="ui container blog-page-wrap">
          <div id="BlogContentContainer" className="ui three stackable cards">
            <ArticleList query={query} />
          </div>
          <button
            id="blogLoadMoreButton"
            className="ui button fluid"
            data-start="0"
            data-limit="3"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </Page>
);

export default SignupPage;
