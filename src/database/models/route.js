'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Route.belongsTo(models.Airport, {foreignKey: "id", as: 'deprture_airport'})
      // Route.belongsTo(models.Airport, {foreignKey: "id", as: 'arrival_airport'})
    }
  }
  Route.init({
    departure_airport_id: DataTypes.INTEGER,
    arrival_airport_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};