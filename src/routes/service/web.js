router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const product = require('../../controllers/product');

router.prefix(
	'/web',
	async (route) => {
		
		route.prefix('/products', async (route) => {
			route.get('/', product.index);
			route.post('/', product.store);
			route.get('/:id', product.show);
			route.put('/:id', product.update);
			route.delete('/:id', product.destroy);
		});
	},
	middlewares.test5,
	middlewares.test6
);

module.exports = router;
