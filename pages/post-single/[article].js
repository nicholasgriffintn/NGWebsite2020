import Page from "../../components/Page";
// import JobDetails from "../../components/jobs/JobDetails";

import { config } from "../../config/config";

import dayjs from "dayjs";

const ReactMarkdown = require("react-markdown");
const CodeBlock = require("../../components/blocks/CodeBlock");

const JobPage = (props) => {
  return (
    <>
      <Page
        displayHeader={true}
        loadDrac={true}
        title={props.loading ? "Loading..." : props.data.article.title}
        path={props.asPath}
      >
        {props.loading ? (
          <p>Loading...</p>
        ) : (
          <div className="single-content-wrap content-wrap">
            <div className="header-single-image-full">
              <picture>
                <source
                  srcSet={`/api/images/resize?image=posts/${props.data.article.id}/header.png&width=639&height=1000&position=left%20top, /api/images/resize?image=posts/${props.data.article.id}/header.png&width=1278&height=1000&position=left%20top 2x`}
                  media="(max-width: 639px)"
                />
                <source
                  srcSet={`/api/images/resize?image=posts/${props.data.article.id}/header.png&width=1023&height=500, /api/images/resize?image=posts/${props.data.article.id}/header.png&width=1680&height=500 2x`}
                  media="(min-width: 640px) and (max-width: 1023px)"
                />
                <source
                  srcSet={`/api/images/resize?image=posts/${props.data.article.id}/header.png&width=1680&height=500`}
                  media="(min-width: 1024px)"
                />
                <img
                  src={`/api/images/resize?image=posts/${props.data.article.id}/header.png&width=1680&height=500`}
                  loading="lazy"
                  alt={props.data.article.title}
                />
              </picture>
            </div>
            <div className="container-main">
              <div className="ui container">
                <div className="post-header">
                  <div className="post-header-titles">
                    <h1 id="single-title" className="animated bounceInDown">
                      {props.data.article.title}
                    </h1>
                    <h1 id="single-subtitle" className="animated bounceInDown">
                      {props.data.article.description}
                    </h1>
                    <small>
                      Posted{" "}
                      {dayjs(props.data.article.createdAt).format(
                        "DD-MM-YYYY HH:mm"
                      )}
                    </small>
                    <hr></hr>
                  </div>
                </div>
                <div className="post-content-wrap">
                  <div>
                    <ReactMarkdown
                      escapeHtml={false}
                      linkTarget={"_blank"}
                      renderers={{ code: CodeBlock }}
                      source={props.data.article.content}
                    />
                  </div>
                </div>
              </div>

              {props.query && props.query.debug === "true" && (
                <div className="page-dev-data">
                  {data && data.job && (
                    <>
                      <h2>Job Data</h2>
                      <div>
                        Current job data:{" "}
                        <pre>{JSON.stringify(props.data.article)}</pre>
                      </div>
                    </>
                  )}

                  <h2>Routing</h2>
                  <div>
                    Current query: <pre>{JSON.stringify(props.query)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Page>
    </>
  );
};

JobPage.getInitialProps = async (context) => {
  let error = false;
  let loading = true;
  let data = {};

  if (context.query && context.query.article) {
    return fetch(config.websiteUrl + "/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetArticle",
        variables: { id: context.query.article },
        query: `query GetArticle {
        article(id: "${context.query.article}") {
          id
          title
          content
          description
          tags
          thumbnail
          header
          createdAt
          updatedAt
        }
      }`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseAsJson) => {
        loading = false;
        data = responseAsJson.data;

        // Pass data to the page via props
        return { data: responseAsJson.data };
      })
      .catch((e) => {
        console.error("error generating server side code");
        console.error(e);
        return { data: { message: "No article id found" } };
      });
  } else {
    console.error("no query");

    error = {
      message: "No article id found",
    };
    loading = false;
    return { data: { message: "No article id found" } };
  }
};

export default JobPage;
