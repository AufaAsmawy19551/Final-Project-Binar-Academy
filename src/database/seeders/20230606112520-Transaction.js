'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Transactions',
			[
				{
					customer_id: 1,
					date: new Date(),
					status: 'paid',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					customer_id: 1,
					date: new Date(),
					status: 'unpaid',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					customer_id: 1,
					date: new Date(),
					status: 'cancelled',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Transactions', null, {});
	},
};
