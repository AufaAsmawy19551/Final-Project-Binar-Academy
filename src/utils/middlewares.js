require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
	auth: async (req, res, next) => {
		try {
			const { authorization } = req.headers;

			if (!authorization) {
				return res.status(401).json({
					status: false,
					message: "you're not authorized!",
					data: null,
				});
			}

			const data = await jwt.verify(authorization, JWT_SECRET_KEY);
			req.user = {
				id: data.id,
				name: data.name,
				email: data.email,
			};

			next();
		} catch (err) {
			next(err);
		}
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
