router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const product = require('../../controllers/product');
const country = require('../../controllers/country');
const airplane = require('../../controllers/airplane');

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

		route.prefix('/airplanes', async (route) => {
			route.get('/', airplane.index);
			route.post('/', airplane.store);
			route.get('/:id', airplane.show);
			route.put('/:id', airplane.update);
			route.delete('/:id', airplane.destroy);
		});

		route.prefix('/products', async (route) => {
			route.get('/', product.index);
			route.post('/', product.store);
			route.get('/:id', product.show);
			route.put('/:id', product.update);
			route.delete('/:id', product.destroy);
		});
	},
	middlewares.test1,
	middlewares.test2
);

module.exports = router;
