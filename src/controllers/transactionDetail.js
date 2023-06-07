const modelName = 'TransactionDetail';
const { TransactionDetail: Model, sequelize } = require('../database/models');
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

			const list = await Model.findAll();

			return res.status(200).json({
				success: true,
				message: `Success get list of ${modelName}s!`,
				data: list,
			});
		} catch (error) {
			next(error);
		}
	},

	store: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.body, {
				transaction_id: 'required|integer|exist:Transactions,id',
				airplane_id: 'required|integer|exist:Airplanes,id',
				seat_id: 'required|integer|exist:Seats,id',
				passenger_title: 'required|string|between:1,255',
				passenger_name: 'required|string|between:1,255',
				passenger_family_name: 'required|string|between:1,255',
				passenger_dob: 'required|date',
				passenger_nationality: 'required|string|between:1,255',
				passenger_identity_card: 'required|string|between:1,255',
				passenger_identity_card_publisher: 'required|string|between:1,255',
				passenger_identity_card_due_date: 'required|date',
				passenger_type: 'required|string|between:1,255',
				boarding_status: 'required|boolean',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const created = await Model.create(req.body);

			return res.status(200).json({
				success: true,
				message: `Success create new ${modelName}!`,
				data: created,
			});
		} catch (error) {
			next(error);
		}
	},

	show: async (req, res, next) => {
		try {
			const details = await Model.findOne({ where: { id: req.params.id } });

			if (!details) {
				return res.status(404).json({
					success: false,
					message: `${modelName} with id ${req.params.id} not found!`,
					error: {},
				});
			}

			return res.status(200).json({
				success: true,
				message: `Success get details of ${modelName} with id ${req.params.id}!`,
				data: details,
			});
		} catch (error) {
			next(error);
		}
	},

	update: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.body, {
				transaction_id: 'required|integer|exist:Transactions,id',
				airplane_id: 'required|integer|exist:Airplanes,id',
				seat_id: 'required|integer|exist:Seats,id',
				passenger_title: 'required|string|between:1,255',
				passenger_name: 'required|string|between:1,255',
				passenger_family_name: 'required|string|between:1,255',
				passenger_dob: 'required|date',
				passenger_nationality: 'required|string|between:1,255',
				passenger_identity_card: 'required|string|between:1,255',
				passenger_identity_card_publisher: 'required|string|between:1,255',
				passenger_identity_card_due_date: 'required|date',
				passenger_type: 'required|string|between:1,255',
				boarding_status: 'required|boolean',
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
