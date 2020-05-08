"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      two_factor_secret: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      two_factor_enabled: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
