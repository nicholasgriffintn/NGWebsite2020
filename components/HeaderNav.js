import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";

import DarkMode from "./DarkModeController";

function HeaderNav({}) {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  return (
    <Fragment>
      <div className="navigation">
        <div
          className="menuToggler"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
        >
          {!toggleMobileNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="512"
              viewBox="0 -53 384 384"
              width="512"
            >
              <path d="M368 154.668H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 32H16C7.168 32 0 24.832 0 16S7.168 0 16 0h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 277.332H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.001 512.001"
            >
              <path d="M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z" />
            </svg>
          )}
        </div>
        <ul className={toggleMobileNav ? "toggledMobile" : ""}>
          <li className="darkMode_Switch"></li>
          <li>
            <Link href="/">
              <a
                className="btn btn-primary btn-header btn-header-link"
                title="Back home"
              >
                Back home
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default HeaderNav;
