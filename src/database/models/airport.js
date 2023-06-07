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

      Airport.belongsTo(models.City, { foreignKey: "id", as: "city" });
      Airport.belongsToMany(models.Flight, {
        foreignKey: "id",
        as: "route",
        through: models.Route,
      });
    }
  }
  Airport.init(
    {
      city_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
