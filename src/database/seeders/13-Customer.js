'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Customers',
			[
				{
					name: 'Aufa',
					email: 'aufamuhammad@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Rizqi',
					email: 'rizkymaulanafrds@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Yasir',
					email: 'm.yasirriziq@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Ukasah',
					email: 'ukasahhayata@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Customers', null, {});
	},
};
