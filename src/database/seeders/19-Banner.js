'use strict';
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const banner1 = "1.webp";
		const banner2 = "2.webp";
		const banner3 = "3.webp";
		const banner4 = "4.webp";
		const banner5 = "5.webp";
		
		await queryInterface.bulkInsert(
			'Banners',
			[
				{
					picture: banner1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					picture: banner2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					picture: banner3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					picture: banner4,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					picture: banner5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Banners', null, {});
	},
};
