router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const product = require('../../controllers/product');

router.prefix('/passenger', async (route) => {
		route.prefix('/products', async (route) => {
			route.get('/', product.index);
			route.post('/', product.store);
			route.get('/:id', product.show);
			route.put('/:id', product.update);
			route.delete('/:id', product.destroy);
		});
	},
	middlewares.test3,
	middlewares.test4
);

module.exports = router;
