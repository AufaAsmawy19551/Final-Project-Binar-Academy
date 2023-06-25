'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seats = []
    for (let seat_number = 1; seat_number <= 12; seat_number++) {
      seats.push({
        number: 'A' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      seats.push({
        number: 'B' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      seats.push({
        number: 'C' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      seats.push({
        number: 'D' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      seats.push({
        number: 'E' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      seats.push({
        number: 'F' + seat_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Seats', seats, {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', seats, {})
  },
}
