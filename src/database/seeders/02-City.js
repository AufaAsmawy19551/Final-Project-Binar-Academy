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
					time_zone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Yogyakarta ',
					code: 'YOGC',
					time_zone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Surabaya',
					code: 'SUBC',
					time_zone: 'Asia/Jakarta',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 2,
					name: 'Singapore',
					code: 'SINC',
					time_zone: 'Asia/Singapore',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 3,
					name: 'Kuala Lumpur',
					code: 'KULC',
					time_zone: 'Asia/Kuala_Lumpur',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 4,
					name: 'Manila',
					code: 'MNLC',
					time_zone: 'Asia/Manila',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 5,
					name: 'Bangkok',
					code: 'BKKC',
					time_zone: 'Asia/Bangkok',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 6,
					name: 'Hanoi',
					code: 'HANC',
					time_zone: 'Asia/Ho_Chi_Minh',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Shanghai',
					code: 'SHAC',
					time_zone: 'Asia/Shanghai',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Tokyo',
					code: 'TYOC',
					time_zone: 'Asia/Tokyo',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 9,
					name: 'Seoul',
					code: 'SELC',
					time_zone: 'Asia/Seoul',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 10,
					name: 'Melbourne',
					code: 'MELC',
					time_zone: 'Australia/Melbourne',
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
