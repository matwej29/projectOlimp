module.exports = (sequelize, DataTypes, Model) => {
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
  return News
};
