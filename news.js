const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('./dbConfig.json');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  password: config.password,
  port: config.port,
  username: config.user,
  database: config.database,
  logging: false,
  query: {
    raw: true
  }
});

class News extends Model {}

News.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    header: {
      type: DataTypes.TEXT('tiny'),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    access: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'News',
    timestamps: false,
    tableName: 'news',
  },
);

module.exports = sequelize.models;
