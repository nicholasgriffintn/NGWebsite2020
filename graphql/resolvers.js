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
      console.log(args);

      let where = {};
      let limit = 6;
      let offset = 0;

      if (args.limit) {
        limit = args.limit;
      }
      if (args.offset) {
        limit = args.offset;
      }

      // Always ensure that there is a filter
      if (args) {
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

      return models.article.cache("all-articles-hp").findAll({
        where,
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
