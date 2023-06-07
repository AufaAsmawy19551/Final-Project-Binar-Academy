'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Cities',
			[
				{
					country_id: 1,
					name: 'Jakarta (JKTC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Yogyakarta (YOGC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Surabaya (SUBC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 2,
					name: 'Singapore (SINC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 3,
					name: 'Kuala Lumpur (KULC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 4,
					name: 'Manila (MNLC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 5,
					name: 'Bangkok (BKKC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 6,
					name: 'Hanoi (HANC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Shanghai (SHAC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Tokyo (TYOC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 9,
					name: 'Seoul (SELC)',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 10,
					name: 'Melbourne (MELC)',
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
