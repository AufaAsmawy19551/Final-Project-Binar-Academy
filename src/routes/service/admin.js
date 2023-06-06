router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const product = require('../../controllers/product');
const country = require('../../controllers/country');

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
