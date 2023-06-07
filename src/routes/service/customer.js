router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const flight = require('../../controllers/flight');

router.prefix(
	'/customer',
	async (route) => {

		route.prefix('/flights', async (route) => {
			route.get('/', flight.index);
			route.get('/:id', flight.show);
		});
	},
	middlewares.test3,
	middlewares.test4
);

module.exports = router;
