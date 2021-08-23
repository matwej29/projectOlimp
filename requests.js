/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @param {import('sequelize').ModelOptions} Model
 * @returns
 */
module.exports = (sequelize, DataTypes, Model) => {
  class Requests extends Model {}
  // team_name: req.body.team_name,
  // team_desc: req.body.team_description,
  // school: req.body.school,
  // boss: req.body.boss,
  // status: 'unread',
  Requests.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      team_desc: {
        type: DataTypes.TEXT,
        defaulValue: '',
      },
      school: {
        type: DataTypes.TEXT,
        defaulValue: '',
      },
      boss: {
        type: DataTypes.TEXT,
        defaulValue: '',
      },
      status: {
        type: DataTypes.TEXT,
        defaulValue: 'unread',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Requests',
      timestamps: false,
      tableName: 'requests',
    },
  );

  return Requests;
};
