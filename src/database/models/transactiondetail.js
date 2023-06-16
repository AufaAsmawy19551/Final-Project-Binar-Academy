'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionDetail.belongsTo(models.Flight, {foreignKey: 'flight_id', as: 'flight'});
      TransactionDetail.belongsTo(models.Seat, {foreignKey: 'seat_id', as: 'seat'});
    }
  }
  TransactionDetail.init({
    transaction_id: DataTypes.INTEGER,
    flight_id: DataTypes.INTEGER,
    seat_id: DataTypes.INTEGER,
    passenger_title_id: DataTypes.INTEGER,
    passenger_name: DataTypes.STRING,
    passenger_family_name: DataTypes.STRING,
    passenger_dob: DataTypes.DATE,
    passenger_nationality_id: DataTypes.INTEGER,
    passenger_identity_card: DataTypes.STRING,
    passenger_identity_card_publisher: DataTypes.STRING,
    passenger_identity_card_due_date: DataTypes.DATE,
    passenger_type: DataTypes.STRING,
    boarding_status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};