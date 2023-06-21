'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('Flights', ['departure_airport_id'], { name: 'flights_departure_airport_id_idx' });
    await queryInterface.addIndex('Flights', ['arrival_airport_id'], { name: 'flights_arrival_airport_id_idx' });
    await queryInterface.addIndex('Airplanes', ['class_id'], { name: 'airplanes_class_id_idx' });
    await queryInterface.addIndex('Airports', ['city_id'], { name: 'airports_city_id_idx' });
    await queryInterface.addIndex('Flights', ['stock'], { name: 'flights_stock_idx' });
    await queryInterface.addIndex('Flights', ['departure_date'], { name: 'flights_departure_date_idx' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('Flights', 'flights_departure_airport_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_arrival_airport_id_idx');
    await queryInterface.removeIndex('Airplanes', 'airplanes_class_id_idx');
    await queryInterface.removeIndex('Airports', 'airports_city_id_idx');
    await queryInterface.removeIndex('Flights', 'flights_stock_idx');
    await queryInterface.removeIndex('Flights', 'flights_departure_date_idx');
  }
}
