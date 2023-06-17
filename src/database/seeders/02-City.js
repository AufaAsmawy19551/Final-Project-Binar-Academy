'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Cities',
			[
				{
					country_id: 1,
					name: 'Jakarta',
					code: 'JKTC',
					timeZone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Yogyakarta ',
					code: 'YOGC',
					timeZone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Surabaya',
					code: 'SUBC',
					timeZone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 2,
					name: 'Singapore',
					code: 'SINC',
					timeZone: 'Asia/Singapore',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 3,
					name: 'Kuala Lumpur',
					code: 'KULC',
					timeZone: 'Asia/Kuala_Lumpur',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 4,
					name: 'Manila',
					code: 'MNLC',
					timeZone: 'Asia/Manila',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 5,
					name: 'Bangkok',
					code: 'BKKC',
					timeZone: 'Asia/Bangkok',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 6,
					name: 'Hanoi',
					code: 'HANC',
					timeZone: 'Asia/Ho_Chi_Minh',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Shanghai',
					code: 'SHAC',
					timeZone: 'Asia/Shanghai',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Tokyo',
					code: 'TYOC',
					timeZone: 'Asia/Tokyo',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 9,
					name: 'Seoul',
					code: 'SELC',
					timeZone: 'Asia/Seoul',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 10,
					name: 'Melbourne',
					code: 'MELC',
					timeZone: 'Australia/Melbourne',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
