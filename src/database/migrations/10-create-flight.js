'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			departure_airport_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Airports',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			arrival_airport_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Airports',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			airplane_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Airplanes',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			departure_date: {
				type: Sequelize.DATE,
			},
			arrival_date: {
				type: Sequelize.DATE,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			discount: {
				type: Sequelize.INTEGER,
			},
			tax: {
				type: Sequelize.INTEGER,
			},
			stock: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};