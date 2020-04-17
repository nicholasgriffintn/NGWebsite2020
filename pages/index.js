import React from "react";

import Page from "../components/Page";

function IndexPage({ query, asPath }) {
  // Note: 'query' contains both /:params and ?query=value from url
  return (
    <Page title={undefined} path={asPath}>
      <div className="content-wrap">
        <div className="container-main">
          <div className="page-header-spacer"></div>
          <h1>Hey! I managed to make a website!</h1>
          <p>Now I just need to put some stuff here...</p>
        </div>

        {query && query.debug === "true" && (
          <div className="page-dev-data">
            <h2>Routing</h2>
            <div>
              Current query: <pre>{JSON.stringify(query)}</pre>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

/* export async function getStaticProps(context) {
  We'll use this to pass props later.
} */

export default IndexPage;
