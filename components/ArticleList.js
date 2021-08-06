import React, { useEffect, useState } from "react";

import ArticleListItem from "./ArticleListItem";

import queryString from "qs";

import { config } from '../../config/config';

const ArticleList = (query) => {
  const [dataState, setData] = useState([]);
  const [loadingState, setLoading] = useState(false);
  const [errorState, setError] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [prevCount, setPrevCount] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const loadBlogPosts = async (resetCount, loadMore) => {
    try {
      setShowLoadMore(false);
      setLoading(true);

      if (resetCount) {
        setCurrentCount(0);
        setPrevCount(0);
      }

      await fetch(`${config.appUrl}/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "GetArticles",
          query: `query GetArticles {
            allArticles(offset: ${prevCount}) {
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
          if (responseAsJson && responseAsJson.data.allArticles) {
            let allArticlesData = responseAsJson.data.allArticles;

            setCurrentCount(allArticlesData.length);

            setPrevCount(prevCount + 6);

            if (allArticlesData.length < 6) {
              setShowLoadMore(false);
            } else {
              setShowLoadMore(true);
            }

            setLoading(false);

            let newData = responseAsJson.data.allArticles;

            if (loadMore) {
              newData = [...dataState, ...responseAsJson.data.allArticles];
            }

            setData(newData);
          } else {
            console.error("no data while loading blog posts.");
          }
        });
    } catch (e) {
      console.error("error while loading blog posts.");
      console.error(e);
    }
  };

  useEffect(async () => {
    loadBlogPosts(true, false);
  }, []);

  return (
    <React.Fragment>
      {dataState &&
        dataState.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      {showLoadMore && (
        <div className="btn-loadmore-wrap">
          <button
            onClick={() => loadBlogPosts(false, true)}
            className="btn btn-primary-inverted btn-loadmore"
          >
            Load More Posts
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default ArticleList;
