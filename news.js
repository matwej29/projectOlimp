// const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes, Model) => {
  class News extends Model {}

  News.init(
    {
      // id: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      header: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
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
  return News;
};
