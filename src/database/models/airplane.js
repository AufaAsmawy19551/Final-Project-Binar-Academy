'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
       // relasi one-to-many -> channel
       Airplane.hasMany(models.Seat, {foreignKey: 'airplane_id', as: 'seats'});
    }
  }
  Airplane.init({
    class_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};