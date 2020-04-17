// src/schema.js

const { gql } = require("apollo-server");

const typeDefs = gql`
  type article {
    id: ID
    title: String
    content: String
    description: String
    tags: String
    thumbnail: String
    header: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    allArticles: [article!]!

    article(id: ID): article
  }

  type Mutation {
    addArticle(title: String!): article!
  }
`;

module.exports = typeDefs;
