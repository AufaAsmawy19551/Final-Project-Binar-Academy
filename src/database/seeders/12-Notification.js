'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Notifications', 
        [ 
          {
            category_id: 1,
            title:"Segera Selesaikan Pembayaran Anda",
            description: lore,
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            title:"Promosi",
            description: "Dapatkan potongan 50% tiket!",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            title:"Notifikasi",
            description: "Terdapat perubahan pada jadwal penerbangan anda, Cek jadwal penerbangan anda disini",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            title:"Waktu Habis",
            description: "Maaf, waktu pemesanan habis, silahkan isi ulang",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          }
        ], 
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
