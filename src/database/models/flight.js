'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-many -> Airport
      Flight.belongsTo(models.Airport, {foreignKey: 'departure_airport_id', as: 'departure_airport'});
      Flight.belongsTo(models.Airport, {foreignKey: 'arrival_airport_id', as: 'destination_airport'});
      Flight.belongsTo(models.Airplane, {foreignKey: 'airplane_id', as: 'airplane'});
      Flight.hasMany(models.TransactionDetail, {foreignKey: 'flight_id', as: 'transaction_details'});
    }
  }
  Flight.init({
    departure_airport_id: DataTypes.INTEGER,
    arrival_airport_id: DataTypes.INTEGER,
    airplane_id: DataTypes.INTEGER,
    departure_date: DataTypes.DATE,
    arrival_date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};