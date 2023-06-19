router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const storage = require('../../utils/storage');
const notification = require('../../controllers/notification');
const transaction = require('../../controllers/transaction');
const authCustomer = require('../../controllers/authCustomer');
const customer = require('../../controllers/customer');
const country = require('../../controllers/country');
const title = require('../../controllers/title');
const media = require('../../controllers/media');
const multer = require('multer')();

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

		route.prefix('/countries', async (route) => {
			route.get('/', country.index);
			route.get('/:id', country.show);
		});

		route.prefix('/titles', async (route) => {
			route.get('/', title.index);
			route.get('/:id', title.show);
		});

		route.prefix('/users', async (route) => {		
			route.get('/', customer.show);
			route.put('/', customer.update);
			route.post('/images', storage.image.single('media'), media.storageSingle);		
		});

		route.prefix('/customer-auth', async (route) => {
			route.post('/logout', authCustomer.logout);
		});

	},
	middlewares.authentication,
	middlewares.authorizarion
);

module.exports = router;
