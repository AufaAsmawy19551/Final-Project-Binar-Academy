'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Transactions', [], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
