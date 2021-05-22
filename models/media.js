'use strict';
module.exports = (sequelize, DataTypes) => {
  const media = sequelize.define(
    'media',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        defaultValue: () => {
          const randomId = nanoid(15);
          return randomId;
        },
      },
      mediatype: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      title: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      s3bucketname: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      s3key: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      s3etag: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      s3location: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      filename: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      originalname: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      mimetype: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      encoding: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      size: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      width: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      height: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      length: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  media.associate = function (models) {
    models.media.hasMany(models.article, {
      as: 'links',
    });

    models.media.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.media.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };
  return media;
};
