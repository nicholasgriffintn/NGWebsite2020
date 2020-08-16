const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { GraphQLDateTime } = require("graphql-iso-date");

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    async article(root, { id }, { models }) {
      return models.article.cache().findByPk(id);
    },
    async allArticles(root, args, { models }) {
      let where = {};
      let limit = 6;
      let offset = 0;

      // Always ensure that there is a filter
      if (args) {
        if (args.limit) {
          limit = args.limit;
        }
        if (args.offset) {
          offset = args.offset;
        }

        if (args.title && args.title !== "") {
          where = {
            ...where,
            ["title"]: args.title,
          };
        }

        // Keyword search
        if (args.search && args.search !== "") {
          where = {
            ...where,
            [Op.or]: [
              { title: { [Op.like]: "%" + args.search + "%" } },
              { content: { [Op.like]: "%" + args.search + "%" } },
            ],
          };
        }
      }

      // Transform the sort
      let sortArg = args.sort || "createdAt desc";
      sortArg = sortArg.split(" ");
      var sortArgArray = new Array();
      for (var i = 0; i < sortArg.length; i++) {
        sortArgArray.push(sortArg[i]);
        if (i != sortArg.length - 1) {
          sortArgArray.push(" ");
        }
      }

      return models.article
        .cache(`all-articles-hp-limit-${limit}-${offset}`)
        .findAll({
          where,
          offset: offset ? Number(offset) : 0,
          limit: limit ? Number(limit) : 6,
          order: [[sortArgArray[0], sortArgArray[2]]],
        });
    },
    async mediaPK(root, { id }, { models }) {
      return models.media.cache().findByPk(id);
    },
    async allMedia(root, args, { models }) {
      let where = {};
      let limit = 6;
      let offset = 0;

      // Always ensure that there is a filter
      if (args) {
        if (args.limit) {
          limit = args.limit;
        }
        if (args.offset) {
          offset = args.offset;
        }

        if (args.mediatype && args.mediatype !== "") {
          where = {
            ...where,
            ["mediatype"]: args.mediatype,
          };
        }

        if (args.title && args.title !== "") {
          where = {
            ...where,
            ["title"]: args.title,
          };
        }

        // Keyword search
        if (args.search && args.search !== "") {
          where = {
            ...where,
            [Op.or]: [
              { title: { [Op.like]: "%" + args.search + "%" } },
              { description: { [Op.like]: "%" + args.search + "%" } },
            ],
          };
        }

        if (args.s3bucketname && args.s3bucketname !== "") {
          where = {
            ...where,
            ["s3bucketname"]: args.s3bucketname,
          };
        }

        if (args.s3key && args.s3key !== "") {
          where = {
            ...where,
            ["s3key"]: args.s3key,
          };
        }

        if (args.filename && args.filename !== "") {
          where = {
            ...where,
            ["filename"]: args.filename,
          };
        }

        if (args.originalname && args.originalname !== "") {
          where = {
            ...where,
            ["originalname"]: args.originalname,
          };
        }

        if (args.mimetype && args.mimetype !== "") {
          where = {
            ...where,
            ["mimetype"]: args.mimetype,
          };
        }

        if (args.links && args.links !== "") {
          where = {
            ...where,
            ["links"]: args.links,
          };
        }
      }

      // Transform the sort
      let sortArg = args.sort || "createdAt desc";
      sortArg = sortArg.split(" ");
      var sortArgArray = new Array();
      for (var i = 0; i < sortArg.length; i++) {
        sortArgArray.push(sortArg[i]);
        if (i != sortArg.length - 1) {
          sortArgArray.push(" ");
        }
      }

      return models.media.cache(`all-media-limit-${limit}-${offset}`).findAll({
        where,
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : 6,
        order: [[sortArgArray[0], sortArgArray[2]]],
      });
    },
  },
  Mutation: {
    async addArticle(root, args, { models }) {
      return {};
    },
  },
};

module.exports = resolvers;
