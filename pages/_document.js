import React from "react";
import Document, { Head, Main, NextScript } from "next/document";

import { config } from "../config/config";

import { useDarkMode } from "../hooks";

function DocumentBody() {
  const [colorMode] = useDarkMode("light");
  // You can use hooks here
  return (
    <body
      className={colorMode && colorMode === "dark" ? "body-dark" : "body-light"}
    >
      {console.log(colorMode)}
      <Main />
      <NextScript />
    </body>
  );
}

export default class MyDocument extends Document {
  // this.props (Server only): __NEXT_DATA__, ampPath, assetPrefix, bodyTags, canonicalBase, dangerousAsPath, dataOnly, devFiles, dynamicImports, files, hasCssMode, head, headTags, html, htmlProps, hybridAmp, inAmpMode, isDevelopment, polyfillFiles, staticMarkup, styles
  render() {
    return (
      <html lang={config.locale.split("_")[0]}>
        <Head>
          {config.googleAnalyticsId ? (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${config.googleAnalyticsId}');`,
                }}
              />
            </>
          ) : null}
        </Head>
        <DocumentBody />
      </html>
    );
  }
}
