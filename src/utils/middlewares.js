require('dotenv').config();
const { Customer, sequelize } = require("../database/models");
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
	authentication: async (req, res, next) => {
		try {
			const { authorization } = req.headers;

			if (!authorization) {
				return res.status(401).json({
					status: false,
					message: "you are unauthenticated!",
					data: null,
				});
			}

			const data = await jwt.verify(authorization.split(" ")[1], JWT_SECRET_KEY);
			req.user = {
				id: data.id,
				name: data.name,
				type: data.type,
				email_verified: data.email_verified,
			};

			if((new Date() - (data.iat * 1000)) > (1000 * 3600 * 200)){
				return res.status(401).json({
					status: false,
					message: "your token is expired!",
					data: null,
				});
			}

			const customer = await Customer.findOne({where: {id: req.user.id}});
			if (customer.token == null) {
				return res.status(401).json({
					status: false,
					message: "you are unauthenticated!",
					data: null,
				});
			}

			next();
		} catch (err) {
			next(err);
		}
	},

	authorizarion: async (req, res, next) => {
		if (!req.user.type == 'customer') {
				return res.status(401).json({
					status: false,
					message: "you are unauthorized!",
					data: null,
				});
			}
		next();
	},


	test1: async (req, res, next) => {
		console.log('Success test 1');
		next();
	},

	test2: async (req, res, next) => {
		console.log('Success test 2');
		next();
	},

	test3: async (req, res, next) => {
		console.log('Success test 3');
		next();
	},

	test4: async (req, res, next) => {
		console.log('Success test 4');
		next();
	},

	test5: async (req, res, next) => {
		console.log('Success test 5');
		next();
	},

	test6: async (req, res, next) => {
		console.log('Success test 6');
		next();
	},
};
