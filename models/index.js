'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { config } = require('../config/config');
const db = {};

const Redis = require('ioredis');
const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

const sequelizeCache = require('sequelize-transparent-cache');
const RedisAdaptor = require('sequelize-transparent-cache-ioredis');

const redisAdaptor = new RedisAdaptor({
  client: redis,
  namespace: 'model',
  lifetime: 60 * 60,
});
const { withCache } = sequelizeCache(redisAdaptor);

let sequelize;
sequelize = new Sequelize(
  config.DATABASE.database,
  config.DATABASE.username,
  config.DATABASE.password,
  config.DATABASE
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = withCache(
      require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    );

    // const model = withCache(sequelize["import"](path.join(__dirname, file)));
    //const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({ force: false, alter: true });

module.exports = db;
