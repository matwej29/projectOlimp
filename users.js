const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (sequelize, DataTypes, Model) => {
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
        type: DataTypes.CHAR(60),
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
  return Users;
};
