const modelName = 'Customer';
const { Customer: Model, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	register: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},

	saveOtp: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},

	login: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},

	requestForgotPassword: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},

	saveForgotPassword: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},

	logout: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			// buat service dan response di sini!
			
		} catch (error) {
			next(error);
		}
	},
};
