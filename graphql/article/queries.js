// Client-side
import gql from "graphql-tag";

const ArticleLongInfo = `
  fragment ArticleLongInfo on job {
    id
    title
    content
    createdAt
    updatedAt
  }
`;

const ArticleShortInfo = `
  fragment ArticleShortInfo on job {
    id
    title
    createdAt
    updatedAt
  }
`;

export const GET_ARTICLES = gql`
  ${ArticleShortInfo}

  query GetArticles(
  ) {
    allArticles(
    ) {
      ...ArticleShortInfo
    }
  }
`;

export const GET_ARTICLE = gql`
  ${ArticleLongInfo}

  query GetArticle($id: ID) {
    article(id: $id) {
      ...ArticleLongInfo
    }
  }
`;
