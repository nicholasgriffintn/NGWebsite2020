import React from "react";

import Typed from "typed.js";

import Page from "../components/Page";

import HomepageJS from "../components/HomepageJS";

function IndexPage({ query, asPath }) {
  // Note: 'query' contains both /:params and ?query=value from url
  return (
    <Page title={undefined} displayHeader={false} path={asPath}>
      <div className="hero-wrap homepage-hero-wrap">
        <div id="background-parallax">
          <div className="background-colours">
            <div className="background"></div>
          </div>
          <div className="background-animation">
            <div id="stars"></div> <div id="stars2"></div>{" "}
            <div id="stars3"></div>
          </div>
          <div className="mid-box-background">
            <div className="title-wrapper">
              <h1 id="homepage-title" className="animated bounceInDown">
                I'm Nicholas Griffin
              </h1>
              <div className="homepage-subtitle">
                <div id="typed-strings">
                  <p>
                    I'm a <strong>web developer</strong>.
                  </p>
                  <p>
                    I'm a <strong>blogger</strong>.
                  </p>
                  <p>
                    I'm a <strong>technology ethusiast</strong>.
                  </p>
                  <p>Okay...</p>
                  <p>I'm really just a bit of a nerd.</p>
                  <p>
                    <span>
                      I live in the <strong>UK</strong>.
                    </span>
                  </p>
                  <p>I spend most of my time doing new stuff on the web.</p>
                  <p>Mostly front end, but I do dabble in a bit of back end.</p>
                  <p>
                    When I run out of stuff on the web, I often end up staying
                    up late with <strong>Netflix</strong>.
                  </p>
                  <p>
                    My dogs are a complete{" "}
                    <span id="dogImageModal">idiots</span>
                  </p>
                  <p>But probably not as bad as some of my code...</p>
                  <p>We've all been through those days.</p>
                  <p>
                    All that said, feel free to check out some more of my stuff.
                  </p>
                </div>
                <div id="typed-strings-delay">
                  <p> </p>
                  <p>Are you still reading this?</p>
                  <p>Did you not see the icon?</p>
                  <p>Seriously... Just scroll your mouse down!</p>
                </div>
                <div id="second-typed-strings-delay">
                  <p> </p>
                  <p>Fine, be like that.</p>
                  <p>I'll just do it for you.</p>
                </div>
                <div id="third-typed-strings-delay">
                  <p>....</p>
                  <p>Was that so hard?</p>
                  <p>Oh wait...</p>
                  <p>You can't see this..</p>
                  <p>
                    I could put anything here right now and you wouldn't have a
                    clue...
                  </p>
                  <p>Watermelons</p>
                  <p>Blueberries</p>
                  <p>Wasn't that fun?</p>
                  <p>
                    I should probably revert this just in case you come back..
                  </p>
                  <p>Right, let's see, what can I put here?...</p>
                  <p>I know!</p>p&gt;
                  <p>Web Developer, Blogger and Technology Enthusiast</p>
                </div>
                <div id="default-typed-strings">
                  <p> </p>
                  <p>Web Developer, Blogger and Technology Enthusiast</p>
                </div>
                <span id="typed"></span>
              </div>
            </div>
            <div className="buttons-wrapper"></div>
          </div>
          <div className="scroll-down">
            <div className="scroll-icon-wrapper">
              <div className="scroller"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="homepage-scroll-target" className="content-wrap">
        <div className="container-fluid container-home-content">
          <div
            className="ui container stackable grid"
            id="mainOpeningContentWrap"
          >
            <div
              id="OpeningContentWrapperWrap"
              className="sixteen wide tablet twelve wide computer column"
            >
              <div id="OpeningContentWrapper">
                <h1>👋 Welcome to my website!</h1>
                <p>
                  As you might have read in the title, my name is Nicholas
                  Griffin and I am a web developer, blogger and technology
                  enthusiast from the UK.
                </p>
                <p>
                  I spend most of my time doing a range of personal web
                  development projects around the web alongside my work for
                  Accrosoft, where I work as a developer and deliver a range of
                  web-based projects for our customers around the globe.
                </p>
                <p>
                  Before I started at Accrosoft, I worked for myself on various
                  freelance web development projects and on my own technology
                  news & reviews site that was called TechNutty (still not a fan
                  of the name). I also spent a few years at the University of
                  Derby, mostly drinking and playing Xbox, occasionally I
                  studied Business Management and somehow managed to achieve a
                  2:1, which is fair enough. 😂
                </p>
                <p>
                  I aim to use this website to not only showcase myself but also
                  start working on a range of other personal projects. You can
                  follow my expeditions below.
                </p>
                <div id="OpeningContentSocial">
                  <a
                    target="_blank"
                    href="https://github.com/nicholasgriffintn"
                    rel="noopener"
                    title="Github"
                    className="social-icon-wrap"
                    id="GithubLinkWrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 0C115.39 0 0 115.39 0 256c0 119.988 84.195 228.984 196 256v-84.695c-11.078 2.425-21.273 2.496-32.55-.828-15.13-4.465-27.423-14.543-36.548-29.91-5.816-9.813-16.125-20.454-26.879-19.672l-2.636-29.883c23.254-1.992 43.37 14.168 55.312 34.23 5.305 8.922 11.41 14.153 19.246 16.465 7.575 2.23 15.707 1.16 25.184-2.187 2.379-18.973 11.07-26.075 17.637-36.075v-.015c-66.68-9.946-93.254-45.32-103.801-73.242-13.977-37.075-6.477-83.391 18.238-112.66.48-.571 1.348-2.063 1.012-3.106-11.332-34.23 2.476-62.547 2.984-65.55 13.078 3.866 15.203-3.892 56.809 21.386l7.191 4.32c3.008 1.793 2.063.77 5.07.543 17.372-4.719 35.684-7.324 53.727-7.558 18.18.234 36.375 2.84 54.465 7.75l2.328.234c-.203-.031.633-.149 2.035-.984 51.973-31.481 50.106-21.192 64.043-25.723.504 3.008 14.13 31.785 2.918 65.582-1.512 4.656 45.059 47.3 19.246 115.754-10.547 27.933-37.117 63.308-103.797 73.254v.015c8.547 13.028 18.817 19.957 18.762 46.832V512c111.809-27.016 196-136.012 196-256C512 115.39 396.61 0 256 0zm0 0"></path>
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://twitter.com/NGriffintn"
                    rel="noopener"
                    title="Twitter"
                    className="social-icon-wrap"
                    id="TwitterLinkWrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                        fill="#03a9f4"
                      ></path>
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/nicholasgriffin-gb/"
                    rel="noopener"
                    title="LinkedIn"
                    className="social-icon-wrap"
                    id="LinkedinLinkWrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 382 382"
                    >
                      <path
                        d="M347.445 0H34.555C15.471 0 0 15.471 0 34.555v312.889C0 366.529 15.471 382 34.555 382h312.889C366.529 382 382 366.529 382 347.444V34.555C382 15.471 366.529 0 347.445 0zM118.207 329.844c0 5.554-4.502 10.056-10.056 10.056H65.345c-5.554 0-10.056-4.502-10.056-10.056V150.403c0-5.554 4.502-10.056 10.056-10.056h42.806c5.554 0 10.056 4.502 10.056 10.056v179.441zM86.748 123.432c-22.459 0-40.666-18.207-40.666-40.666S64.289 42.1 86.748 42.1s40.666 18.207 40.666 40.666-18.206 40.666-40.666 40.666zM341.91 330.654a9.247 9.247 0 0 1-9.246 9.246H286.73a9.247 9.247 0 0 1-9.246-9.246v-84.168c0-12.556 3.683-55.021-32.813-55.021-28.309 0-34.051 29.066-35.204 42.11v97.079a9.246 9.246 0 0 1-9.246 9.246h-44.426a9.247 9.247 0 0 1-9.246-9.246V149.593a9.247 9.247 0 0 1 9.246-9.246h44.426a9.247 9.247 0 0 1 9.246 9.246v15.655c10.497-15.753 26.097-27.912 59.312-27.912 73.552 0 73.131 68.716 73.131 106.472v86.846z"
                        fill="#0077b7"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div
              id="MusicOpeningWrapper"
              className="sixteen wide tablet four wide computer column"
            >
              <div id="spotify-widget" className="ui stackable grid"></div>
              <span id="MusicOpeningWrapperTitle">
                What I'm listening to
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 407.437 407.437"
                >
                  <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z"></path>
                </svg>
              </span>
            </div>
          </div>
          <div
            id="BlogandMoreAboutWrapper"
            className="conntainer-fluid coloured-container"
          >
            <div className="ui container">
              <div id="BlogPostOpenerWrapper">
                <h2>What's going on?</h2>
                <p>
                  Below you will find some of the blog posts that I have wrote
                  (if that is still working), I used to write a lot and I'm
                  looking to write blog posts more about the projects that I am
                  working on. There might not be a lot here but I hope that it
                  will at least be interesting, at least to me.
                </p>
              </div>
            </div>
          </div>
          <div
            id="BlogandMoreAboutSeconndWrapper"
            className="conntainer-fluid coloured-float-container"
          >
            <div className="ui container">
              <h2
                id="single-title"
                className="white-text animated bounceInDown"
              >
                No blog anymore...
              </h2>
              <h2 className="white-text">Sorry, I broke it.</h2>
              <p>Maybe later?</p>
              <button
                id="blogLoadMoreButton"
                className="ui button fluid"
                data-start="0"
                data-limit="3"
              >
                Load More
              </button>
            </div>
          </div>
          <div id="ExtraContentWrapper" className="ui container">
            <div id="ExtraContentContainer">
              <h2>So what is it that you do? 🤔</h2>
              <small>
                I'm not sure that I actually know but here's some of my public
                Github stuff:
              </small>
              <div
                className="ui three stackable cards"
                id="githubReposContainer"
              ></div>
            </div>
            <div id="SkillsContentContainer">
              <h3>Languages that I often write in</h3>
              <div className="ui grid">
                <div className="doubling eight column row">
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="CSS3"
                      loading="lazy"
                      src="/uploads/langaugesIcons/css3.svg"
                    />
                    <span>CSS3</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="GraphQL"
                      loading="lazy"
                      src="/uploads/langaugesIcons/graphql.svg"
                    />
                    <span>GraphQL</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="HTML5"
                      loading="lazy"
                      src="/uploads/langaugesIcons/html5.svg"
                    />
                    <span>HTML5</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="JavaScript"
                      loading="lazy"
                      src="/uploads/langaugesIcons/javascript.svg"
                    />
                    <span>JavaScript</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="SASS"
                      loading="lazy"
                      src="/uploads/langaugesIcons/sass.svg"
                    />
                    <span>SASS</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="JSON"
                      loading="lazy"
                      src="/uploads/langaugesIcons/json.svg"
                    />
                    <span>JSON</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="PHP"
                      loading="lazy"
                      src="/uploads/langaugesIcons/php.svg"
                    />
                    <span>PHP</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="React"
                      loading="lazy"
                      src="/uploads/langaugesIcons/react.svg"
                    />
                    <span>React (JSX)</span>
                  </div>
                </div>
              </div>
              <h3>Tools that I often use</h3>
              <div className="ui grid">
                <div className="doubling eight column row">
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Bootstrap"
                      loading="lazy"
                      src="/uploads/langaugesIcons/bootstrap.svg"
                    />
                    <span>Bootstrap</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="CloudFlare"
                      loading="lazy"
                      src="/uploads/langaugesIcons/cloudflare.svg"
                    />
                    <span>CloudFlare</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="NPM"
                      loading="lazy"
                      src="/uploads/langaugesIcons/npm.svg"
                    />
                    <span>NPM</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Firebase"
                      loading="lazy"
                      src="/uploads/langaugesIcons/firebase.svg"
                    />
                    <span>Firebase</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Gatsby"
                      loading="lazy"
                      src="/uploads/langaugesIcons/gatsby.svg"
                    />
                    <span>Gatsby</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Git"
                      loading="lazy"
                      src="/uploads/langaugesIcons/git.svg"
                    />
                    <span>Git</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Google Analytics"
                      loading="lazy"
                      src="/uploads/langaugesIcons/googleanalytics.svg"
                    />
                    <span>Google Analytics</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="NGINX"
                      loading="lazy"
                      src="/uploads/langaugesIcons/nginx.svg"
                    />
                    <span>NGINX</span>
                  </div>
                </div>
                <div className="doubling eight column row">
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="NodeJS"
                      loading="lazy"
                      src="/uploads/langaugesIcons/nodejs.svg"
                    />
                    <span>NodeJS</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Docker"
                      loading="lazy"
                      src="/uploads/langaugesIcons/docker.svg"
                    />
                    <span>Docker</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="AWS"
                      loading="lazy"
                      src="/uploads/langaugesIcons/aws.svg"
                    />
                    <span>AWS</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Sentry"
                      loading="lazy"
                      src="/uploads/langaugesIcons/sentry.svg"
                    />
                    <span>Sentry</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Yarn"
                      loading="lazy"
                      src="/uploads/langaugesIcons/yarn.svg"
                    />
                    <span>Yarn</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Visual Studio Code"
                      loading="lazy"
                      src="/uploads/langaugesIcons/visualstudiocode.svg"
                    />
                    <span>Visual Studio / Code</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Webpack"
                      loading="lazy"
                      src="/uploads/langaugesIcons/webpack.svg"
                    />
                    <span>Webpack</span>
                  </div>
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="WordPress"
                      loading="lazy"
                      src="/uploads/langaugesIcons/wordpress.svg"
                    />
                    <span>WordPress</span>
                  </div>
                </div>
              </div>
              <small>And last but not least...</small>
              <div className="ui grid">
                <div className="doubling one column row">
                  <div className="column icon-grid-item">
                    <img
                      className="lazy"
                      alt="Stack Overflow"
                      loading="lazy"
                      src="/uploads/langaugesIcons/stackoverflow.svg"
                    />
                    <span>
                      Stack Overflow (it's always good to be honest xD)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <HomepageJS />
    </Page>
  );
}

/* export async function getStaticProps(context) {
  We'll use this to pass props later.
} */

export default IndexPage;
