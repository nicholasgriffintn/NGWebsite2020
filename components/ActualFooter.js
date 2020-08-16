import React, { useState, useEffect } from "react";

function Footer() {
  useEffect(() => {
    window.Promise ||
      document.write('<script src="js/es6-promise.min.js" ></script>');
    window.fetch || document.write('<script src="js/fetch.min.js"></script>');

    // Create cookie function
    function createCookie(name, value, days) {
      var expires;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Reading cookies function
    function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    }

    var cookieMessage = document.querySelector(".js-cookie-message");

    var hasCookie = readCookie("visited");

    if (!hasCookie) {
      cookieMessage.removeAttribute("hidden");
    }

    cookieMessage.addEventListener("click", (el) => {
      if (el.target.nodeName === "BUTTON") {
        console.log("hiding cookie message now");
        cookieMessage.setAttribute("hidden", true);
        createCookie("visited", true, 365);
      }
    });
  });

  const fonts = [["Open Sans", "300,400,700"]];

  return (
    <footer>
      <div className="footer-wrap">
        <div className="container-main">
          <span className="footer-text-left">No copyright required.</span>
          <span className="footer-text-right">
            Check out the source code for this site on{" "}
            <a
              href="https://github.com/nicholasgriffintn/NGWebsite2020"
              title="Github Source Code"
              target="_blank"
            >
              Github
            </a>
            . And the{" "}
            <a
              href="https://nicholasgriffin.dev/api/graphql"
              title="Personal Site GraphQL Playground"
              target="_blank"
            >
              GraphQL API here
            </a>
          </span>
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

      {fonts.map((font) => (
        <link
          key={font[0]}
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${`${font[0].replace(
            / /g,
            "+"
          )}${font[1] ? ":" + font[1] : ""}`}&display=swap`}
        />
      ))}
    </footer>
  );
}

export default Footer;
