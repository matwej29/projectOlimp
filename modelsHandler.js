const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('./dbConfig.json');

console.log('requiring modelsHandler');

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

sequelize.modelManager.addModel(Users)

sequelize.models = {
  Users,
  News,
  Pages,
  Teams
};

sequelize.sync({ alter: true });

module.exports = sequelize.models;
