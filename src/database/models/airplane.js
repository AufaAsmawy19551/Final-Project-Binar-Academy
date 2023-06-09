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
      
       // relasi one-to-many -> seat
      Airplane.hasMany(models.Seat, {foreignKey: 'airplane_id', as: 'seats'});
      Airplane.belongsTo(models.Class, {foreignKey: 'class_id', as: 'class'});
      Airplane.belongsToMany(models.Facility, {foreignKey: 'airplane_id', as: 'facilities', through: models.AirplaneFacility});
       //Airplane.belongsTo(models.Class, {foreignKey: 'class_id', as: 'class'});
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