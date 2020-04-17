// Client-side
import gql from "graphql-tag";

export const GET_ARTICLES = gql`
  fragment ArticleShortInfo on job {
    id
    title
    description
    tags
    thumbnail
    createdAt
    updatedAt
  }

  query GetArticles {
    allArticles {
      ...ArticleShortInfo
    }
  }
`;

export const GET_ARTICLE = gql`
  fragment ArticleLongInfo on job {
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

  query GetArticle($id: ID) {
    article(id: $id) {
      ...ArticleLongInfo
    }
  }
`;
