'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const banner1 = "http://localhost:3000/images/banner/1.svg";
		const banner2 = "http://localhost:3000/images/banner/2.svg";
		const banner3 = "http://localhost:3000/images/banner/3.svg";
		const banner4 = "http://localhost:3000/images/banner/4.svg";
		const banner5 = "http://localhost:3000/images/banner/5.svg";
		
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
