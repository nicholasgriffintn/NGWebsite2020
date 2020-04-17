import React, { useEffect, useState } from "react";

import ArticleListItem from "./ArticleListItem";

import queryString from "qs";

let prevCount = 0;
let currentCount = 0;
let keywordTime = null;

const ArticleList = (query) => {
  const [dataState, setData] = useState({});
  const [loadingState, setLoading] = useState(false);
  const [errorState, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const triggerBlogPostLoad = async () => {
    try {
      setLoading(true);

      fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "GetArticles",
          query: `query GetArticles {
            allArticles {
                id
                title
                description
                tags
                thumbnail
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
          setLoading(false);
          console.log(responseAsJson);

          setData(responseAsJson.data);
        });
    } catch (e) {
      console.error("error while loading blog posts.");
      console.error(e);
    }
  };

  useEffect(() => {
    triggerBlogPostLoad();
  }, []);

  return (
    <React.Fragment>
      {console.log(dataState)}
      {dataState &&
        dataState.allArticles &&
        dataState.allArticles.map((article) => {
          console.log(article);
          <ArticleListItem key={article.id} job={article} />;
        })}
    </React.Fragment>
  );
};

export default ArticleList;
