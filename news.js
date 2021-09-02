const { format } = require('date-fns');
const { ru } = require('date-fns/locale');

/**
 * @param {import('sequelize/types').Sequelize} sequelize
 * @param {import('sequelize/types').DataTypes} DataTypes
 * @param {import('sequelize/types').Model} Model
 * @returns {import('sequelize/types').ModelDefined}
 */
module.exports = (sequelize, DataTypes, Model) => {
  class News extends Model {}
  /** @type {import('sequelize/types').ModelDefined} */
  News.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
        get() {
          /**
           * @type {Date}
           */
          const date = this.getDataValue('date');
          // return `${date.getHours()}:${date.getMinutes()} ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
          return format(date, 'H:mm d MMMM yyyy', { locale: ru });
        },
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
