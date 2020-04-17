import React, { useEffect, useState } from "react";

import dayjs from "dayjs";

const ArticleListItem = ({ job, index, inProgress = false }) => {
  if (loadingState) return <div>Loading...</div>;
  if (errorState) return `Error! ${errorState.message}`;

  return (
    <article class="ui card">
      <div class="image">
        <img
          loading="lazy"
          src={article.tumbnail}
          alt={article.title}
          class="lazy loaded"
        />
      </div>{" "}
      <div class="content">
        <a href={"/post-single/" + article.id} class="header">
          {article.title}
        </a>{" "}
        <div class="meta">
          <span class="date">{dayjs(article.createdAt).format()}</span>
        </div>{" "}
        <div class="description">{article.description}</div>
      </div>{" "}
      <div class="extra content">
        <a
          href={"/post-single/" + article.id}
          class="ui button primary basic inverted"
        >
          Read more
        </a>
      </div>
    </article>
  );
};

export default ArticleListItem;
