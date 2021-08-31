const bcrypt = require('bcryptjs');
const saltRounds = 15;

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @param {import('sequelize').Model} Model
 * @returns
 */
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
        // validate: { isEmail: true },
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
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
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
