const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('./dbConfig.json');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  password: config.password,
  port: config.port,
  username: config.username,
  database: config.database,
  logging: false,
});

sequelize.authenticate();

const Users = require('./users')(sequelize, DataTypes, Model);
const News = require('./news')(sequelize, DataTypes, Model);
const Pages = require('./pages')(sequelize, DataTypes, Model);
const Teams = require('./teams')(sequelize, DataTypes, Model);

sequelize.modelManager.addModel(Users);
sequelize.modelManager.addModel(News);
sequelize.modelManager.addModel(Pages);
sequelize.modelManager.addModel(Teams);

sequelize.sync({ alter: true });

/**
 * @type {import('sequelize/types').ModelCtor}
 */
module.exports = sequelize.models;
