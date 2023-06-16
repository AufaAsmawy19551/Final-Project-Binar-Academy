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
            description: "Segera selesaikan pembayaran anda sebelum masa pembayaran anda expired!",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            category_id: 2,
            title:"Potongan Harga Tiket Penerbangan",
            description: "Dapatkan potongan 50% tiket!",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            category_id: 3,
            title:"Perubahan Jadwal Penerbangan",
            description: "Terdapat perubahan pada jadwal penerbangan anda, Cek jadwal penerbangan anda disini",
            date: new Date(),
            createdAt: new Date(),
					  updatedAt: new Date(),        
          },
          {
            category_id: 4,
            title:"Waktu Pemesanan Expired!",
            description: "Maaf, waktu pemesananan habis, silahkan lakukan pemesanan ulang!",
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
