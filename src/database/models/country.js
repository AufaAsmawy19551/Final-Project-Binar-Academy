'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relasi one-to-one -> city
      Country.hasMany(models.City, {foreignKey: "country_id", as: "cities"})
      
    }
  }
  Country.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};