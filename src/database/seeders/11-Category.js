'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Categories', 
        [ 
          {
            name:"Status pembayaran",
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            name:"Promosi",
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            name:"Notifikasi",
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            name:"Waktu habis",
            createdAt: new Date(),
					  updatedAt: new Date(),        
          }
        ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
