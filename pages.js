module.exports = (sequelize, DataTypes, Model) => {
  class Pages extends Model {}

  Pages.init(
    {
      title: {
        type: DataTypes.TEXT('tiny'),
      },
      body: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Pages',
      timestamps: false,
      tableName: 'pages',
    },
  );
  return Pages
};
