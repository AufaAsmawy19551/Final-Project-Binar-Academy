'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-one -> Category
      Notification.belongsTo(models.Category, {foreignKey: 'id', as: 'category'});

      // relasi many-to-many -> Customer through: CustomerNotification
      Notification.belongsToMany(models.Customer, {foreignKey: 'notification_id', as: 'notification', through: models.CustomerNotification});
    }
  }
  Notification.init({
    category_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};