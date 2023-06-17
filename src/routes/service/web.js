router = require('../../utils/routeGrouping');

const middlewares = require('../../utils/middlewares');
const authCustomer = require('../../controllers/authCustomer');
const flight = require('../../controllers/flight');
const kelas = require('../../controllers/class');
const facility = require('../../controllers/facility');
const airport = require('../../controllers/airport');

router.prefix(
	'/web',
	async (route) => {

		route.prefix('/customer-auth', async (route) => {
			route.post('/register', authCustomer.register);
			route.get('/get-otp', authCustomer.register);
			// route.post('/save-otp', authCustomer.saveOtp);
			route.post('/login', authCustomer.login);
			route.post('/request-forgot-password', authCustomer.requestForgotPassword);
			route.get('/reset-password', authCustomer.resetPasswordPage)
			route.post('/save-forgot-password', authCustomer.saveForgotPassword);
			route.get('/oauth', authCustomer.googleOauth2)
		});
	
		route.prefix('/flights', async (route) => {
			route.get('/', flight.index);
			route.get('/:id', flight.show);
		});

		route.prefix('/classes', async (route) => {
			route.get('/', kelas.index);			
		});

		route.prefix('/facilities', async (route) => {
			route.get('/', facility.index);
		});

		route.prefix('/airports', async (route) => {
			route.get('/', airport.index);			
			route.get('/:id', airport.show);			
		});
	},
	middlewares.test5,
	middlewares.test6
);

module.exports = router;
