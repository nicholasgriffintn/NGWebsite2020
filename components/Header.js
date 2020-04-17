import React from "react";
import Link from "next/link";

import HeaderNav from "./HeaderNav";

const AppIcon = () => (
  <Link href="/">
    <a href="/">
      <span>Nicholas Griffin</span>
    </a>
  </Link>
);

const Header = ({ children }) => {
  return (
    <header className={"main-header container-fluid header"} id="header">
      <div className="container-main">
        <div className="header-left-wrap">
          <div className="site-title-header">
            <AppIcon />
          </div>
        </div>
        <div className="header-right-wrap">
          <HeaderNav />
          {children}
        </div>
      </div>
      <style jsx>{`
        header {
          position: absolute;
          z-index: 1000;
          width: 100%;
          left: 0;
          top: 0;
          height: 70px;
          line-height: 50px;
          font-weight: normal;
          text-align: center;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .color-header-bg.color-background-fg {
          background: #400082;
        }

        .header-left-wrap {
          width: auto;
          display: inline-block;
          float: left;
          vertical-align: middle;
        }

        .header-right-wrap {
          display: inline-block;
          width: auto;
          float: right;
        }

        :global(main) {
          top: 0px;
        }
      `}</style>
    </header>
  );
};

export default Header;
