'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // relasi many-to-one -> airplane
      // Seat.belongsTo(models.Airplane, {foreignKey: 'id', as: 'airplane'});
    }
  }
  Seat.init({
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};