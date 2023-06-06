'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const seats = [];
		for (let airplane_id = 1; airplane_id <= 10; airplane_id++) {
			for (let seat_number = 1; seat_number <= 12; seat_number++) {
				seats.push({
					airplane_id: airplane_id,
					number: 'A' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				seats.push({
					airplane_id: airplane_id,
					number: 'B' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				seats.push({
					airplane_id: airplane_id,
					number: 'C' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				seats.push({
					airplane_id: airplane_id,
					number: 'D' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				seats.push({
					airplane_id: airplane_id,
					number: 'E' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
				seats.push({
					airplane_id: airplane_id,
					number: 'F' + seat_number,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
		}
		await queryInterface.bulkInsert('Classes', seats, {});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Seat', seats, {});
	},
};
