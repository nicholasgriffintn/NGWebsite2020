'use strict';
module.exports = (sequelize, DataTypes) => {
  const surge = sequelize.define(
    'surge',
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
      magnet: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      magnetinfo: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      thumbnails: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      userInfo: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      tags: {
        allowNull: false,
        type: DataTypes.JSONB,
      },
      status: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: 'Public',
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  surge.associate = function (models) {
    // associations can be defined here
  };
  return surge;
};
