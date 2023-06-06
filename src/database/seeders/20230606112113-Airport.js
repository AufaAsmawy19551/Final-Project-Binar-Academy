'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Airports',
			[
				{
					city_id: 1,
					name: 'Soekarno Hatta (CGK)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 1,
					name: 'Halim Perdanakusuma (HLP)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 2,
					name: 'Adi Sutjipto (YOG)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 2,
					name: 'Yogyakarta International Airport (YIA)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 3,
					name: 'Juanda (SUB)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 4,
					name: 'Singapore Changi Airport (SIN)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 4,
					name: 'Singapore Seletar Airport (XSP)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 5,
					name: 'Kuala Lumpur International Airport (KUL)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 5,
					name: 'Sultan Abdul Aziz Shah Airport (SZB)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 6,
					name: 'Ninoy Aquino International Airport (MNL)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 7,
					name: 'Suvarnabhumi International Airport (BKK)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 7,
					name: 'Don Mueang International Airport (DMK)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 8,
					name: 'Noi Bai International Airport (HAN)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 9,
					name: 'Hongqiao International Airport (SHA)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 9,
					name: 'Pudong International Airport (PVG)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 10,
					name: 'Haneda International Airport (HND)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 10,
					name: 'Narita International Airport (NRT)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 11,
					name: 'Gimpo International Airport (GMP)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 11,
					name: 'Incheon International Airport (ICN)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Melbourne International Airport (MEL)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Avalon International Airport (AVV)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Essendon International Airport (MEB)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Airports', null, {});
	},
};
