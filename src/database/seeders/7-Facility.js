'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Facilities',
			[
				{
          name: 'bagasi lebih besar',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          name: 'kursi lebih lebar dan nyaman',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          name: 'makanan mewah',
          createdAt: new Date(),
					updatedAt: new Date(),
        }
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
