'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-many -> Notification through: CustomerNotification
      Customer.belongsToMany(models.Notification, {foreignKey: 'customer_id', as: 'customer', through: models.CustomerNotification});
      // Customer.hasMany(models.CustomerNotification, {foreignKey: 'customer_id', as: 'customernotif'});

       // relasi one-to-many -> transaction
      // Customer.hasMany(models.Transaction, {foreignKey: 'customer_id', as: 'customer_transaction'});
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    title_id: DataTypes.INTEGER,
    family_name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    otp_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};