'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('Flights', ['id'], { name: 'flights_id_idx' });
    await queryInterface.addIndex('Flights', ['departure_airport_id'], { name: 'flights_departure_airport_id_idx' });
    await queryInterface.addIndex('Flights', ['arrival_airport_id'], { name: 'flights_arrival_airport_id_idx' });
    await queryInterface.addIndex('Flights', ['airplane_id'], { name: 'flights_airplane_id_idx' });
    await queryInterface.addIndex('Airplanes', ['class_id'], { name: 'airplanes_class_id_idx' });
    await queryInterface.addIndex('Airports', ['city_id'], { name: 'airports_city_id_idx' });
    await queryInterface.addIndex('Flights', ['discount'], { name: 'flights_discount_idx' });
    await queryInterface.addIndex('Flights', ['stock'], { name: 'flights_stock_idx' });
    await queryInterface.addIndex('Flights', ['departure_date'], { name: 'flights_departure_date_idx' });
    await queryInterface.addIndex('TransactionDetails', ['seat_id'], { name: 'transaction_details_seat_id_idx' });
    await queryInterface.addIndex('TransactionDetails', ['id'], { name: 'transaction_details_id_idx' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Flights', 'flights_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_departure_airport_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_arrival_airport_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_airplane_id_idx');
    await queryInterface.removeIndex('Airplanes', 'airplanes_class_id_idx');
    await queryInterface.removeIndex('Airports', 'airports_city_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_discount_idx');
    await queryInterface.removeIndex('Flights', 'flights_stock_idx');
    await queryInterface.removeIndex('Flights', 'flights_departure_date_idx');
    await queryInterface.removeIndex('Flights', 'transaction_details_seat_id_idx');
    await queryInterface.removeIndex('TransactionDetails', 'transaction_details_id_idx');
  }
}
