'use strict'

const { route } = require('../../utils/routeGrouping')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const {routes} = require('./data/routeData.js')
    const date = '2023-06-15T06:00:00.000Z';
    const numberDays= 90;
    const numberAirplanes= 30;

    for (let day = 0; day < numberDays; day++) {
      const flights = []
      for (let route_idx = 0; route_idx < routes.length; route_idx++) {
        const route = routes[route_idx]
        const departureDate = new Date(date)
        const arrivalDate = new Date(date)
        departureDate.setMilliseconds(1000 * 3600 * 24 * day)
        arrivalDate.setMilliseconds(route.duration + 1000 * 3600 * 24 * day)
        for (let airplane_id = 1; airplane_id <= numberAirplanes; airplane_id++) {
          flights.push({
            departure_airport_id: route.departure_airport_id,
            arrival_airport_id: route.arrival_airport_id,
            airplane_id: airplane_id,
            departure_date: new Date(departureDate),
            arrival_date: new Date(arrivalDate),
            price:
              (route.duration / 3600000) *
              (500000 + Math.floor(Math.pow(airplane_id / 6 + 1, 2)) * 10000) *
              Math.pow(airplane_id % 3 || 3, 2),
            discount: airplane_id % 6 < 3 ? Math.floor(airplane_id / 6) * 5 * 2 : 0,
            tax: 5,
            stock: 72,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          if(airplane_id % 3 == 1){
            departureDate.setMilliseconds(1000 * 60 * 30)
            arrivalDate.setMilliseconds(1000 * 60 * 30)
          }
        }
      }
      await queryInterface.bulkInsert('Flights', flights, {})
    }

    for (let day = 0; day < numberDays; day++) {
      const flights = []
      for (let route_idx = 0; route_idx < routes.length; route_idx++) {
        const route = routes[route_idx]
        const departureDate = new Date(date)
        const arrivalDate = new Date(date)
        departureDate.setMilliseconds(1000 * 3600 * 24 * day)
        arrivalDate.setMilliseconds(route.duration + 1000 * 3600 * 24 * day)
        for (let airplane_id = 1; airplane_id <= numberAirplanes; airplane_id++) {
          flights.push({
            departure_airport_id: route.arrival_airport_id,
            arrival_airport_id: route.departure_airport_id,
            airplane_id: airplane_id,
            departure_date: new Date(departureDate),
            arrival_date: new Date(arrivalDate),
            price:
              (route.duration / 3600000) *
              (500000 + Math.floor(Math.pow(airplane_id / 6 + 1, 2)) * 10000) *
              Math.pow(airplane_id % 3 || 3, 2),
            discount: airplane_id % 6 < 3 ? Math.floor(airplane_id / 6) * 5 : 0,
            tax: 5,
            stock: 72,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          if(airplane_id % 3 == 1){
            departureDate.setMilliseconds(1000 * 60 * 30)
            arrivalDate.setMilliseconds(1000 * 60 * 30)
          }
        }
      }
      await queryInterface.bulkInsert('Flights', flights, {})
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {})
  },
}
