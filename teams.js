module.exports = (sequelize, DataTypes, Model) => {
  class Teams extends Model {}

  Teams.init(
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
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
