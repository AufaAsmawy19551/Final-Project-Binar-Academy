'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Countries',
			[
				{
					name: 'Indonesia',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Singapore',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Malaysia',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Philippines',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Thailand',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Vietnam',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'China',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Japan',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'South Korea',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Australia',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Countries', null, {});
  }
};
