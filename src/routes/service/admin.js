router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const country = require('../../controllers/country');
const city = require('../../controllers/city');
const airport = require('../../controllers/airport');
const flightRoute = require('../../controllers/route');
const kelas = require('../../controllers/class');
const airplane = require('../../controllers/airplane');
const facility = require('../../controllers/facility');
const seat = require('../../controllers/seat');
const airplaneFacility = require('../../controllers/airplaneFacility');
const flight = require('../../controllers/flight');
const category = require('../../controllers/category');
const notification = require('../../controllers/notification');
const customer = require('../../controllers/customer');
const customerNotification = require('../../controllers/customerNotification');
const transaction = require('../../controllers/transaction');
const transactionDetail = require('../../controllers/transactionDetail');

router.prefix(
	'/admin',
	async (route) => {
		route.prefix('/countries', async (route) => {
			route.get('/', country.index);
			route.post('/', country.store);
			route.get('/:id', country.show);
			route.put('/:id', country.update);
			route.delete('/:id', country.destroy);
		});

		route.prefix('/cities', async (route) => {
			route.get('/', city.index);
			route.post('/', city.store);
			route.get('/:id', city.show);
			route.put('/:id', city.update);
			route.delete('/:id', city.destroy);
		});

		route.prefix('/airports', async (route) => {
			route.get('/', airport.index);
			route.post('/', airport.store);
			route.get('/:id', airport.show);
			route.put('/:id', airport.update);
			route.delete('/:id', airport.destroy);
		});

		route.prefix('/routes', async (route) => {
			route.get('/', flightRoute.index);
			route.post('/', flightRoute.store);
			route.get('/:id', flightRoute.show);
			route.put('/:id', flightRoute.update);
			route.delete('/:id', flightRoute.destroy);
		});

		route.prefix('/classes', async (route) => {
			route.get('/', kelas.index);
			route.post('/', kelas.store);
			route.get('/:id', kelas.show);
			route.put('/:id', kelas.update);
			route.delete('/:id', kelas.destroy);
		});

		route.prefix('/airplanes', async (route) => {
			route.get('/', airplane.index);
			route.post('/', airplane.store);
			route.get('/:id', airplane.show);
			route.put('/:id', airplane.update);
			route.delete('/:id', airplane.destroy);
		});

		route.prefix('/facilities', async (route) => {
			route.get('/', facility.index);
			route.post('/', facility.store);
			route.get('/:id', facility.show);
			route.put('/:id', facility.update);
			route.delete('/:id', facility.destroy);
		});

		route.prefix('/seats', async (route) => {
			route.get('/', seat.index);
			route.post('/', seat.store);
			route.get('/:id', seat.show);
			route.put('/:id', seat.update);
			route.delete('/:id', seat.destroy);
		});

		route.prefix('/airplane-facilities', async (route) => {
			route.get('/', airplaneFacility.index);
			route.post('/', airplaneFacility.store);
			route.get('/:id', airplaneFacility.show);
			route.put('/:id', airplaneFacility.update);
			route.delete('/:id', airplaneFacility.destroy);
		});

		route.prefix('/flights', async (route) => {
			route.get('/', flight.index);
			route.post('/', flight.store);
			route.get('/:id', flight.show);
			route.put('/:id', flight.update);
			route.delete('/:id', flight.destroy);
		});

		route.prefix('/categories', async (route) => {
			route.get('/', category.index);
			route.post('/', category.store);
			route.get('/:id', category.show);
			route.put('/:id', category.update);
			route.delete('/:id', category.destroy);
		});

		route.prefix('/notifications', async (route) => {
			route.get('/', notification.index);
			route.post('/', notification.store);
			route.get('/:id', notification.show);
			route.put('/:id', notification.update);
			route.delete('/:id', notification.destroy);
		});

		route.prefix('/customers', async (route) => {
			route.get('/', customer.index);
			route.post('/', customer.store);
			route.get('/:id', customer.show);
			route.put('/:id', customer.update);
			route.delete('/:id', customer.destroy);
		});

		route.prefix('/customer-notifications', async (route) => {
			route.get('/', customerNotification.index);
			route.post('/', customerNotification.store);
			route.get('/:id', customerNotification.show);
			route.put('/:id', customerNotification.update);
			route.delete('/:id', customerNotification.destroy);
		});

		route.prefix('/transactions', async (route) => {
			route.get('/', transaction.index);
			route.post('/', transaction.store);
			route.get('/:id', transaction.show);
			route.put('/:id', transaction.update);
			route.delete('/:id', transaction.destroy);
		});

		route.prefix('/transaction-details', async (route) => {
			route.get('/', transactionDetail.index);
			route.post('/', transactionDetail.store);
			route.get('/:id', transactionDetail.show);
			route.put('/:id', transactionDetail.update);
			route.delete('/:id', transactionDetail.destroy);
		});
	},
	middlewares.test1,
	middlewares.test2
);

module.exports = router;
