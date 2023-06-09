'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi many-to-many -> Airplane
      Facility.belongsToMany(models.Airplane, {foreignKey: 'facility_id', as: 'facilities', through: models.AirplaneFacility});
    }
  }
  Facility.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Facility',
  });
  return Facility;
};