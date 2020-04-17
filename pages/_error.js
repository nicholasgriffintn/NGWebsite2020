// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

const ErrorPage = ({ statusCode }) => (
  <Page displayHeader={true} title="Error">
    <div className="content-wrap">
      <div className="container-main">
        <div className="page-header-spacer"></div>
        <h1>Error (code {statusCode})</h1>
        <p>Sorry, but there was an error (code {statusCode}).</p>
      </div>
    </div>
  </Page>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
