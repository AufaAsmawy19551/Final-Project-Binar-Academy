"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Airport.belongsTo(models.City, { foreignKey: "id", as: "cities" });
      Airport.hasMany(models.Flight, { foreignKey: 'departure_airport_id', as: 'outcomming_flights' });
      Airport.hasMany(models.Flight, { foreignKey: "arrival_airport_id", as: "incomming_flights"});
    }
  }
  Airport.init(
    {
      city_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
