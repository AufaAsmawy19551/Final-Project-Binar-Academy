'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const banner1 = "https://drive.google.com/file/d/12Opc3GD8PlFDC_KBUlMUz5yyIV8lgx4p/view"
		const banner2 ="https://drive.google.com/file/d/1N6qR2tlngJcl5A7X32vUtOq7jfJJpo8b/view"
		const banner3 ="https://drive.google.com/file/d/1ejw12rLUAKtoQHAS6blEvLZu8JsEN7hO/view"
		const banner4 ="https://drive.google.com/file/d/1X5z_wh-RW87lelXel0XkNs0ZsoEIrC_1/view"
		const banner5 ="https://drive.google.com/file/d/1DS2Bpg-WO-O6sYk0hG8HZxwPMleCI_L0/view"
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
