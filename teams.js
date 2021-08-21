/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @param {import('sequelize').ModelOptions} Model 
 * @returns 
 */
module.exports = (sequelize, DataTypes, Model) => {
  class Teams extends Model {}

  Teams.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT('tiny'),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Teams',
      timestamps: false,
      tableName: 'teams',
    },
  );
  
  return Teams;
};
