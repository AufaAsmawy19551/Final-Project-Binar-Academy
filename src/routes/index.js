const express = require('express');
const router = express.Router();

const documentation = require('./docs/documentation');
const passenger = require('./service/passenger');
const admin = require('./service/admin');
const web = require('./service/web');

router.use(web);
router.use(admin);
router.use(passenger);
router.use(documentation);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
