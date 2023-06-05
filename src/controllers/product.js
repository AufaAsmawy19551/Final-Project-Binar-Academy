const modelName = "Product";
const { Product: Model, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	index: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const products = await Model.findAll();
			
			return res.status(200).json({
				success: true,
				message: `Success get list of ${modelName}s!`,
				data: products,
			});
		} catch (error) {
			next(error);
		}
	},

	store: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.body, {
				title: 'required|string|between:1,255',
				description: 'required|string|between:1,255',
				quantity: 'required|integer|min:0',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const product = await Model.create(req.body);

			return res.status(200).json({
				success: true,
				message: `Success create new ${modelName}!`,
				data: product,
			});
		} catch (error) {
			next(error);
		}
	},

	show: async (req, res, next) => {
		try {
			const product = await Model.findOne({ where: { id: req.params.id } });

			if (!product) {
				return res.status(404).json({
					success: false,
					message: `${modelName} with id ${req.params.id} not found!`,
					error: {},
				});
			}

			return res.status(200).json({
				success: true,
				message: `Success get details of ${modelName} with id ${req.params.id}!`,
				data: product,
			});
		} catch (error) {
			next(error);
		}
	},

	update: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.body, {
				title: 'string|between:1,255',
				description: 'string|between:1,255',
				quantity: 'integer|min:0',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const updated = await Model.update(req.body, { where: { id: req.params.id }, returning: true });

			if (!updated[1][0]) {
				return res.status(404).json({
					success: false,
					message: `${modelName} with id ${req.params.id} not found!`,
					error: {},
				});
			}

			return res.status(200).json({
				success: true,
				message: `Success update ${modelName} with id ${req.params.id}!`,
				data: updated[1][0],
			});
		} catch (error) {
			next(error);
		}
	},

	destroy: async (req, res, next) => {
		try {
			const deleted = await Model.destroy({ where: { id: req.params.id }, returning: true });

			if (!deleted) {
				return res.status(404).json({
					status: false,
					message: `${modelName} with id ${req.params.id} not found!`,
					error: {},
				});
			}

			return res.status(200).json({
				status: true,
				message: `Success delete ${modelName} with id ${req.params.id}!`,
				data: {},
			});
		} catch (error) {
			next(error);
		}
	},
};
