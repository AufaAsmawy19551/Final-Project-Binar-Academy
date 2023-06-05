router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const product = require('../../controllers/product');

router.prefix('/admin', async (route) => {
	
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
