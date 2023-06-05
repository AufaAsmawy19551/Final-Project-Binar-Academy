const express = require('express');
const router = express.Router();

const documentation = require('./docs/documentation');
const passenger = require('./service/passenger');
const admin = require('./service/admin');
const web = require('./service/web');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.prefix('/api', async (route) => {
	route.use(web);
	route.use(admin);
	route.use(passenger);
	route.use(documentation);
});

module.exports = router;
