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
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      team_desc: {
        type: DataTypes.CHAR(200),
        defaulValue: '',
      },
      school: {
        type: DataTypes.CHAR(50),
        defaulValue: '',
      },
      boss: {
        type: DataTypes.CHAR(50),
        defaulValue: '',
      },
      status: {
        type: DataTypes.CHAR(20),
        defaulValue: 'unread',
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reason: {
        type: DataTypes.CHAR(20)
      }
    },
    {
      sequelize,
      modelName: 'Requests',
      timestamps: true,
      tableName: 'requests',
    },
  );

  return Requests;
};
