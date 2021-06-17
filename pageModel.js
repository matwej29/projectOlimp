const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('./dbConfig.json');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  password: config.password,
  port: config.port,
  username: config.user,
  database: config.database,
  logging: false
});

class Pages extends Model {}

Pages.init(
  {
    title: {
      type: DataTypes.TEXT('tiny'),
    },
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Pages',
    timestamps: false,
    tableName: 'pages',
  },
);

module.exports = sequelize.models;
