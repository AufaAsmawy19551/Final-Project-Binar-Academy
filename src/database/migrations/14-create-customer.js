'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      title_id: {
        type: Sequelize.INTEGER,
        references: {
					model: 'Titles',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
      },
      family_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      email_verified: {
        type: Sequelize.BOOLEAN
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      otp_code: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Customers');
  }
};