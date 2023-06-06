'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Classes',
			[
				{
					name: 'Economy',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Business',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
        {
					name: 'First',
					createdAt: new Date(),
					updatedAt: new Date(),
				},		
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Classes', null, {});
  }
};
