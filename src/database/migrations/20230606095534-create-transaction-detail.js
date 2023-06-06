'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.INTEGER
      },
      airplane_id: {
        type: Sequelize.INTEGER
      },
      seat_id: {
        type: Sequelize.INTEGER
      },
      passenger_title: {
        type: Sequelize.STRING
      },
      passenger_name: {
        type: Sequelize.STRING
      },
      passenger_family_name: {
        type: Sequelize.STRING
      },
      passenger_dob: {
        type: Sequelize.DATE
      },
      passenger_nationality: {
        type: Sequelize.STRING
      },
      passenger_identity_card: {
        type: Sequelize.STRING
      },
      passenger_identity_card_publisher: {
        type: Sequelize.STRING
      },
      passenger_identity_card_due_date: {
        type: Sequelize.DATE
      },
      passenger_type: {
        type: Sequelize.STRING
      },
      boarding_status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TransactionDetails');
  }
};