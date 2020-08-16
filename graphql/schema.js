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

  type media {
    id: ID
    title: String
    description: String
    mediatype: String
    s3bucketname: String
    s3key: String
    s3location: String
    s3etag: String
    filename: String
    originalname: String
    mimetype: String
    encoding: String
    size: String
    width: String
    height: String
    length: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    allArticles(
      limit: Int
      offset: Int
      title: String
      search: String
      sort: String
    ): [article!]!

    article(id: ID): article

    allMedia(
      limit: Int
      offset: Int
      title: String
      search: String
      mediatype: String
      s3bucketname: String
      s3key: String
      filename: String
      originalname: String
      mimetype: String
      links: String
    ): [media!]!

    mediaPK(id: ID): media
  }

  type Mutation {
    addArticle(title: String!): article!
  }
`;

module.exports = typeDefs;
