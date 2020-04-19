import Head from "next/head";

import manifest from "../public/manifest.json";
import { config } from "../config/config";

const PageHead = ({
  title,
  loadDrac,
  description = config.appDescription,
  jobData = {},
  path = "/",
}) => {
  const pageTitle = title
    ? `${title} – ${config.appName}`
    : `${config.appName} – ${config.appTagline}`;

  const iconUrl = "/icons/icon-512.png";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      <meta charSet="utf-8" />
      <meta
        httpEquiv="content-language"
        content={config.locale.split("_")[0]}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />

      <link rel="manifest" href="/manifest.json" />

      <meta name="keywords" content={config.appKeywords}></meta>
      <meta name="subject" content={config.appTagline}></meta>

      <meta property="og:site_name" content={config.appName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={config.locale} />
      <meta
        name="Developer"
        content="Nicholas Griffin <me@nicholasgriffin.co.uk>"
      ></meta>
      <meta
        name="Author"
        content="Nicholas Griffin <me@nicholasgriffin.co.uk>"
      ></meta>
      <meta name="copyright" content="Nicholas Griffin"></meta>
      <meta name="robots" content="index,follow"></meta>

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={config.mainSocialImageURL} />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:image:alt" content={pageTitle}></meta>

      <link rel="shortcut icon" type="image/x-icon" href={iconUrl} />

      <link rel="apple-touch-icon" href={iconUrl} />

      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/icons/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/icons/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />

      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/icons/ms-icon-144x144.png"
      />

      <meta name="theme-color" content="#00BDAA"></meta>
      <link rel="apple-touch-icon" href={iconUrl} />

      {manifest.display === "standalone" ? (
        <meta name="apple-mobile-web-app-capable" content="yes" />
      ) : null}
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={config.appName} />

      <meta property="og:image" content={config.mainSocialImageURL} />

      <link rel="canonical" href={config.websiteUrl + path} />
      <meta property="og:url" content={config.websiteUrl + path} />

      {config.googleSiteVerification ? (
        <meta
          name="google-site-verification"
          content={config.googleSiteVerification}
        />
      ) : null}

      {loadDrac && <link rel="stylesheet" href="/css/dracula.min.css" />}
    </Head>
  );
};
export default PageHead;
