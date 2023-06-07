'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AirplaneFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi many-to-one -> Facility
      AirplaneFacility.belongsTo(models.Facility, {foreignKey: 'id', as: 'facility'});
      // relasi many-to-one -> Airplane
      AirplaneFacility.belongsTo(models.Airplane, {foreignKey: 'id', as: 'airplane'});
    }
  }
  AirplaneFacility.init({
    class_id: DataTypes.INTEGER,
    airplane_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AirplaneFacility',
  });
  return AirplaneFacility;
};