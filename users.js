const { Sequelize, DataTypes, Model } = require('sequelize');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

// const Console = require('Console');
const config = require('./dbConfig.json');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.host,
  password: config.password,
  port: config.port,
  username: config.user,
  database: config.database,
  logging: false,
});

class Users extends Model {}

Users.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.TEXT('tiny'),
      validate: { isEmail: true },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    access: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Users',
    timestamps: true,
    tableName: 'users',
  },
);

Users.comparePasswords = async (password, user) => {
  const result = await bcrypt.compare(password, user.password);
  return result;
};

Users.hashPassword = async user => {
  user.password = await bcrypt.hash(user.password, saltRounds);
};

Users.beforeSave(Users.hashPassword);
module.exports = sequelize.models;
