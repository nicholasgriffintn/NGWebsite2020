// src/schema.js

const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar DateTime

  type article {
    id: ID
    title: String
    content: String
    description: String
    tags: String
    thumbnail: String
    header: String
    createdAt: DateTime
    updatedAt: DateTime
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
