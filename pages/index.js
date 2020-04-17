import React from "react";

import Page from "../components/Page";

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
                    I'm a<strong>web developer</strong>.
                  </p>
                  <p>
                    I'm a<strong>blogger</strong>.
                  </p>
                  <p>
                    I'm a<strong>technology ethusiast</strong>.
                  </p>
                  <p>Okay...</p>
                  <p>I'm really just a bit of a nerd.</p>
                  <p>
                    <span>
                      I live in the
                      <strong>UK</strong>.
                    </span>
                  </p>
                  <p>I spend most of my time doing new stuff on the web.</p>
                  <p>Mostly front end, but I do dabble in a bit of back end.</p>
                  <p>
                    When I run out of stuff on the web, I often end up staying
                    up late with
                    <strong>Netflix</strong>.
                  </p>
                  <p>
                    My dogs are a complete
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
