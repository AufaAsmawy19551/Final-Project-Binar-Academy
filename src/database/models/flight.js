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

      // relasi many-to-many -> Airport through: Route
      Flight.belongsToMany(models.Airport, {foreignKey: 'id', as: 'routes', through: models.Route});

      // relasi many-to-many -> Transaction through: TransactionDetail
      Flight.belongsToMany(models.Transaction, {foreignKey: 'id', as: 'transaction', through: models.TransactionDetail});
    }
  }
  Flight.init({
    route_id: DataTypes.INTEGER,
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