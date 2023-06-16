'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Customers',
			[
				{
					title_id: 1,
					name: 'Aufa',
					family_name: null,
					email: 'aufamuhammad19551@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title_id: 1,
					name: 'Rizqi',
					family_name: null,
					email: 'rizkymaulanafrds@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title_id: 1,
					name: 'Yasir',
					family_name: null,
					email: 'm.yasirriziq@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title_id: 1,
					name: 'Ukasah',
					family_name: null,
					email: 'ukasahhayata@gmail.com',
					email_verified: true,
					phone: '12345678910',
					password: await bcrypt.hash('password', 10),
					otp_code: '123456',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title_id: 1,
					name: 'Beni',
					family_name: null,
					email: 'beni@gmail.com',
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
