'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define(
    'article',
    {
      id: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true,
        unique: true,
        defaultValue: () => {
          const randomId = nanoid(15);
          return randomId;
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tags: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      thumbnail: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      header: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  article.associate = function (models) {
    // associations can be defined here
  };
  return article;
};
