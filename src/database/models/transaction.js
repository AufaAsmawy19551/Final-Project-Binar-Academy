'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

     // relasi many-to-many -> Flight through: TransactionDetail
     Transaction.belongsToMany(models.Flight, {foreignKey: 'transaction_id', as: 'payment', through: models.TransactionDetail});
    }
  }
  Transaction.init({
    customer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    payment_date: DataTypes.DATE,
    payment_due_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};