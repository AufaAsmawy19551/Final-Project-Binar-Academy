"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Flights",
      [
        {
          route_id: 1,
          airplane_class_id: 3,
          departure_date: new Date("2023-06-21T07:30:00.000Z"),
          arrival_date: new Date("2023-06-23T08:30:00.000Z"),
          price: 1500000,
          discount: 10,
          tax: 5,
          stock: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Flights", null, {});
  },
};
