import React from "react";

import dayjs from "dayjs";

const ArticleListItem = ({ article, index, inProgress = false }) => {
  return (
    <article
      className={inProgress === article.id ? "inProgress ui card" : "ui card"}
    >
      <div className="image">
        <img
          loading="lazy"
          src={article.thumbnail}
          alt={article.title}
          className="lazy loaded"
        />
      </div>{" "}
      <div className="content">
        <a href={"/post-single/" + article.id} className="header">
          {article.title}
        </a>{" "}
        <div className="meta">
          <span className="date">
            {dayjs(article.createdAt).format("DD-MM-YYYY HH:mm")}
          </span>
        </div>{" "}
        <div className="description">{article.description}</div>
      </div>{" "}
      <div className="extra content">
        <a
          href={"/post-single/" + article.id}
          className="btn btn-primary-inverted"
        >
          Read more
        </a>
      </div>
    </article>
  );
};

export default ArticleListItem;
