'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Titles',
			[
                {
                    name: '-',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },		
				{
					name: 'Mr.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Mrs.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
                {
					name: 'Miss.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Titles', null, {});
  }
};
