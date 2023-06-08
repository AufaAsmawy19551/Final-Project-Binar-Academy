'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'CustomerNotifications',
			[
        {
          customer_id: 1,
          notification_id: 1,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
				{
          customer_id: 1,
          notification_id: 2,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 1,
          notification_id: 3,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 2,
          notification_id: 1,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 2,
          notification_id: 2,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 2,
          notification_id: 3,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 3,
          notification_id: 1,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 3,
          notification_id: 2,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
        {
          customer_id: 3,
          notification_id: 3,
          is_read: true,
          createdAt: new Date(),
					updatedAt: new Date(),
        },
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CustomerNotifications', null, {});
  }
};
