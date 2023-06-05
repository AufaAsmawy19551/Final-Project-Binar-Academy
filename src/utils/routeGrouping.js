const express = require('express');
const router = express.Router();

express.Router.prefix = function (path, configure, ...middleware) {
	const router = express.Router();
	this.use(path, middleware, router);
	configure(router);
	return router;
};

module.exports = router;
