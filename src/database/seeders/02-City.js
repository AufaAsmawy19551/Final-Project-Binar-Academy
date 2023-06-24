'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Cities',
			[
				{
					country_id: 1,
					name: 'Jakarta',
					code: 'JKTC',
					time_zone: 'Asia/Jakarta',
					image: "https://cdn.sweetescape.com/images/cities/jakarta/cover/42b36424-c701-448e-9ab9-9c5b70cdb6cb.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Yogyakarta ',
					code: 'YOGC',
					time_zone: 'Asia/Jakarta',
					image: "https://thumbs.dreamstime.com/b/light-trail-tugu-jogja-yogyakarta-monument-blue-hours-vehicle-traffic-indonesia-september-130681537.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 1,
					name: 'Surabaya',
					code: 'SUBC',
					time_zone: 'Asia/Jakarta',
					image: "https://www.wowkeren.com/display/images/photo/2019/03/07/00247464.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 2,
					name: 'Singapore',
					code: 'SINC',
					time_zone: 'Asia/Singapore',
					image: "https://cdn.sweetescape.com/images/cities/singapore/cover/106501bc-bcfb-4d1a-bb60-b237dafdcea7.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 3,
					name: 'Kuala Lumpur',
					code: 'KULC',
					time_zone: 'Asia/Kuala_Lumpur',
					image: "https://media.istockphoto.com/id/466842820/photo/petronas-towers.jpg?s=612x612&w=0&k=20&c=X_Kl-W_ulJEzjvaaT8gRNTQWHboyLKaedXol5EPhGdI=",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 4,
					name: 'Manila',
					code: 'MNLC',
					time_zone: 'Asia/Manila',
					image: "https://media.istockphoto.com/id/1196930302/photo/port-of-manila.jpg?s=170667a&w=0&k=20&c=mbad-rRcuy2W6_SGfi5IzTwEjifJTgrEDWFvKLs0tNk=",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 5,
					name: 'Bangkok',
					code: 'BKKC',
					time_zone: 'Asia/Bangkok',
					image: "https://www.shutterstock.com/image-photo/grand-palace-wat-phra-keaw-260nw-367503629.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 6,
					name: 'Hanoi',
					code: 'HANC',
					time_zone: 'Asia/Ho_Chi_Minh',
					image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFub2l8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Shanghai',
					code: 'SHAC',
					time_zone: 'Asia/Shanghai',
					image: "https://images7.alphacoders.com/105/1058190.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 7,
					name: 'Tokyo',
					code: 'TYOC',
					time_zone: 'Asia/Tokyo',
					image: "https://wallpapers.com/images/featured/dxva6ho3h8x6m3xb.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 9,
					name: 'Seoul',
					code: 'SELC',
					time_zone: 'Asia/Seoul',
					image: "https://i.pinimg.com/736x/7d/dc/34/7ddc34b2676947ce00c98313ad4a46fa.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					country_id: 10,
					name: 'Melbourne',
					code: 'MELC',
					time_zone: 'Australia/Melbourne',
					image: "https://cdn.wallpapersafari.com/73/1/PKhzl3.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
