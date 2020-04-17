// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const NotFoundPage = () => (
  <Page displayHeader={true} title="Error">
    <div className="content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>
        <h1>Whoops. That doesn't exist.</h1>
        <p>Sorry about that. Feel free to go back to my homepage.</p>
      </div>
    </div>
  </Page>
);

export default NotFoundPage;
