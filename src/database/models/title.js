'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Title extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Title.hasMany(models.Airplane, {foreignKey: 'class_id', as: 'Airplane'});
    }
  }
  Title.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Title',
  });
  return Title;
};