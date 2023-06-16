'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionDetails', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			transaction_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Transactions',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			flight_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Flights',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			seat_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Seats',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			passenger_title_id: {
				type: Sequelize.INTEGER,
			references: {
				model: 'Titles',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
			},
			passenger_name: {
				type: Sequelize.STRING,
			},
			passenger_family_name: {
				type: Sequelize.STRING,
			},
			passenger_dob: {
				type: Sequelize.DATE,
			},
			passenger_nationality_id: {
				type: Sequelize.INTEGER,
			references: {
				model: 'Countries',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
			},
			passenger_identity_card: {
				type: Sequelize.STRING,
			},
			passenger_identity_card_publisher: {
				type: Sequelize.STRING,
			},
			passenger_identity_card_due_date: {
				type: Sequelize.DATE,
			},
			passenger_type: {
				type: Sequelize.STRING,
			},
			boarding_status: {
				type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('TransactionDetails');
  }
};