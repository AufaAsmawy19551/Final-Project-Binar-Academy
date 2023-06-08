router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const notification = require('../../controllers/notification');
const transaction = require('../../controllers/transaction');
const authCustomer = require('../../controllers/authCustomer');
const customer = require('../../controllers/customer');

router.prefix(
	'/customer',
	async (route) => {

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
			route.get('/', customer.show);
			route.put('/', customer.update);			
		});

		route.prefix('/customer-auth', async (route) => {
			route.post('/logout', authCustomer.logout);
		});

	},
	middlewares.test3,
	middlewares.test4
);

module.exports = router;
