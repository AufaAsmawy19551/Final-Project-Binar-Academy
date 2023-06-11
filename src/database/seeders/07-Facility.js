'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Facilities',
			[
				{
          name: 'Baggage 20 kg',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          name: 'Cabbin baggage 7kg',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          name: 'In Flight Entertainment',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          name: 'Free Launch',
          createdAt: new Date(),
					updatedAt: new Date(),
        },
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Facilities', null, {});
  }
};
