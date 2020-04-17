import React, { Fragment } from "react";

import PageHead from "../components/PageHead";
import Header from "../components/Header";
import ActualFooter from "../components/ActualFooter";

function Page({ title, description, path, children }) {
  return (
    <Fragment>
      <PageHead title={title} description={description} path={path} />

      <main>
        <Header />

        <section className="content">{children}</section>

        <ActualFooter />
      </main>
    </Fragment>
  );
}

export default Page;
