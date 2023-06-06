'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'AirplaneFacilities', 
        [ 
          {
            facility_id: 1,
            airplane_id: 1,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 1,
            airplane_id: 2,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 1,
            airplane_id: 3,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 2,
            airplane_id: 1,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 2,
            airplane_id: 2,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 2,
            airplane_id: 3,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 3,
            airplane_id: 1,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 3,
            airplane_id: 2,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 3,
            airplane_id: 3,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            facility_id: 4,
            airplane_id: 1,
            createdAt: new Date(),
					  updatedAt: new Date(),        
          }
        ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AirplaneFacilities', null, {});
  }
};
