"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Routes",
      [
        {
          departure_airport_id: 1,
          arrival_airport_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 2,
          arrival_airport_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 3,
          arrival_airport_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 5,
          arrival_airport_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 6,
          arrival_airport_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 7,
          arrival_airport_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 8,
          arrival_airport_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 9,
          arrival_airport_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 10,
          arrival_airport_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 11,
          arrival_airport_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 10,
          arrival_airport_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 5,
          arrival_airport_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 6,
          arrival_airport_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 4,
          arrival_airport_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 7,
          arrival_airport_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 3,
          arrival_airport_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 3,
          arrival_airport_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 4,
          arrival_airport_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 3,
          arrival_airport_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 6,
          arrival_airport_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          departure_airport_id: 8,
          arrival_airport_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Routes", null, {});
  },
};
