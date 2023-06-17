'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Airports',
			[
				{
					city_id: 1,
					name: 'Soekarno Hatta',
					code: 'CGK',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 1,
					name: 'Halim Perdanakusuma',
					code: 'HLP',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 2,
					name: 'Adi Sutjipto',
					code: 'YOG',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 2,
					name: 'Yogyakarta International Airport',
					code: 'YIA',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 3,
					name: 'Juanda',
					code: 'SUB',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 4,
					name: 'Singapore Changi Airport',
					code: 'SIN',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 4,
					name: 'Singapore Seletar Airport',
					code: 'XSP',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 5,
					name: 'Kuala Lumpur International Airport',
					code: 'KUL',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 5,
					name: 'Sultan Abdul Aziz Shah Airport',
					code: 'SZB',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 6,
					name: 'Ninoy Aquino International Airport',
					code: 'MNL',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 7,
					name: 'Suvarnabhumi International Airport',
					code: 'BKK',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 7,
					name: 'Don Mueang International Airport',
					code: 'DMK',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 8,
					name: 'Noi Bai International Airport',
					code: 'HAN',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 9,
					name: 'Hongqiao International Airport',
					code: 'SHA',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 9,
					name: 'Pudong International Airport',
					code: 'PVG',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 10,
					name: 'Haneda International Airport',
					code: 'HND',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 10,
					name: 'Narita International Airport',
					code: 'NRT',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 11,
					name: 'Gimpo International Airport',
					code: 'GMP',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 11,
					name: 'Incheon International Airport',
					code: 'ICN',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Melbourne International Airport',
					code: 'MEL',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Avalon International Airport',
					code: 'AVV',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					city_id: 12,
					name: 'Essendon International Airport',
					code: 'MEB',
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
