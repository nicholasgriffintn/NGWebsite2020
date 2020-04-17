"use strict";
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
    "article",
    {
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  article.associate = function (models) {
    // associations can be defined here
  };
  return article;
};
