const modelName = 'Customer';
const bycrypt = require("bcrypt")
const { Customer: Model,Customer, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	register: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {
				name: 'required|string|exist:Cutomers,id',
				email: 'required|unique|string|exist:Customers,id',
				password: 'required|string|min:8|max:255|confirmed',
				password_confirmation: 'required|string|min:8|max:255|confirmed',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}
			const hashPassword = await bycrypt(password,10)
			// buat service dan response di sini!
			const customer = await Customer.create({
				name, email, password: hashPassword
			})

			return res.status(201).json({
				status: true,
				message: "User Created!",
				data: {
					id: customer.id,
					name: customer.name,
					email: customer.email
				}
			})
		} catch (error) {
			next(error);
		}
	},

	saveOtp: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {
				otp_code: "required|string"
			});

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
			const validation = await Validator.validate(req.query, {
				email: 'required|unique|string|exist:Customers,id',
				password: 'required|string|min:8|max:255'
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}
			const hashPassword = await bycrypt(password,10)
			// buat service dan response di sini!
			const customer = await Customer.create({
				name, email, password: hashPassword
			})
			// buat service dan response di sini!
			return res.status(201).json({
				status: true,
				message: "User Created!",
				data: {
					id: customer.id,
					name: customer.name,
					email: customer.email
				}
			})
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
