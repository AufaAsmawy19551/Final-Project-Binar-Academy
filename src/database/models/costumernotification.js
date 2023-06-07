'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CostumerNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CostumerNotification.init({
    customer_id: DataTypes.INTEGER,
    notification_id: DataTypes.INTEGER,
    is_read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CostumerNotification',
  });
  return CostumerNotification;
};