import React from "react";
import Link from "next/link";

export default ({}) => (
  <footer>
    <div className="footer-wrap">
      <div className="container-main">
        <p>This is my footer. That's all I have for this...</p>
      </div>
    </div>
    <div className="cookies js-cookie-message" hidden>
      <div className="cookies__box">
        <p>
          <strong>Another 🍪 notification.</strong>
          Sorry to bug you, I know these are annoying, just letting you know
          that I am using cookies on this site to track analytics, annoymously
          of course.
        </p>
        <button className="button button--primary">That's fine</button>
      </div>
    </div>
  </footer>
);
