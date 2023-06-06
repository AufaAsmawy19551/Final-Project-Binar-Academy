'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const now = new Date();
		await queryInterface.bulkInsert(
			'Transactions',
			[
				{
					customer_id: 1,
					date: new Date(),
					payment_date: null,
					payment_due_date: new Date(now.getTime() + 1000 * 3600 * 24),
					status: 'paid',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					customer_id: 1,
					date: new Date(),
					payment_date: null,
					payment_due_date: new Date(now.getTime() + 1000 * 3600 * 24),
					status: 'unpaid',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					customer_id: 1,
					date: new Date(),
					payment_date: null,
					payment_due_date: new Date(now.getTime() + 1000 * 3600 * 24),
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
