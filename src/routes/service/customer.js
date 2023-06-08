router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const flight = require('../../controllers/flight');
const notification = require('../../controllers/notification');
const airport = require('../../controllers/airport');
const facility = require('../../controllers/facility');
const auth = require('../../controllers/auth');
const kelas = require('../../controllers/class');
const customer = require('../../controllers/customer');

router.prefix(
	'/customer',
	async (route) => {

		route.prefix('/flights', async (route) => {
			route.get('/', flight.index);
			route.get('/:id', flight.show);
		});

		route.prefix('/classes', async (route) => {
			route.get('/', kelas.index);			
			route.get('/:id', kelas.show);			
		});

		route.prefix('/facilities', async (route) => {
			route.get('/', facility.index);
		});

		route.prefix('/airports', async (route) => {
			route.get('/', airport.index);			
			route.get('/:id', airport.show);			
		});


		route.prefix('/notifications', async (route) => {
			route.get('/', notification.index);			
			route.get('/:id', notification.show);
			route.put('/:id', notification.update);			
		});

		route.prefix('/transactions', async (route) => {
			route.get('/', transaction.index);
			route.post('/', transaction.store);
			route.get('/:id', transaction.show);
		});

		route.prefix('/users', async (route) => {		
			route.get('/:id', customer.show);
			route.put('/:id', customer.update);			
		});

		route.prefix('/auth', async (route) => {
			
			route.post('/', auth.store);
			route.post('/', auth.store);
			route.post('/', auth.store);
			route.post('/', auth.store);
			route.post('/', auth.store);
			route.get('/', auth.index);
					
		});

	},
	middlewares.test3,
	middlewares.test4
);

module.exports = router;
