'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const banner1 = "https://www.wekatravel.com/wp-content/uploads/2017/10/banner-flights.jpg"
		const banner2 ="https://images.freekaamaal.com/featured_images/91217_1478082312.jpg"
		const banner3 ="https://images.via.com/static/dynimg/search_page/12/normal/1044047240-1044047239_dom-banner-994x415jpg.jpg"
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
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Banners', null, {});
	},
};
