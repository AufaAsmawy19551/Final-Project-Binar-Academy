const modelName = 'Flight';
const { request } = require('express');
const { Flight: Model, Airport, Airplane, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	index: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {
				departure_airport_id: 'required|integer|exist:Airports,id',
				destination_airport_id: 'required|integer|exist:Airports,id',
				departure_date: 'required|date',
				number_passenger: 'required|integer|min:1',
				class_id: 'required|integer|exist:Classes,id',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const list = await Model.findAll({
				where: {
					departure_airport_id: req.query.departure_airport_id,
					arrival_airport_id: req.query.destination_airport_id,
				},
			});

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
				departure_airport_id: 'required|integer|exist:Airports,id',
				arrival_airport_id: 'required|integer|exist:Airports,id',
				airplane_id: 'required|integer|exist:Airplanes,id',
				departure_date: 'required|date',
				arrival_date: `required|date`,
				price: 'required|integer|min:0',
				discount: 'integer|min:0|max:100',
				tax: 'integer|min:0|max:100',
				stock: 'required|integer|min:0|max:72',
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
			const details = await Model.findOne({
				where: { id: req.params.id },
				include: [
					{
						model: Airplane,
						as: 'airplane',
					},
					{
						model: Airport,
						as: 'departure_airport',
					},
					{
						model: Airport,
						as: 'destination_airport',
					},
				],
			});

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
				departure_airport_id: 'integer|exist:Airports,id',
				arrival_airport_id: 'integer|exist:Airports,id',
				airplane_id: 'integer|exist:Airplanes,id',
				departure_date: 'date',
				arrival_date: `date`,
				price: 'integer|min:0',
				discount: 'min:0|max:100',
				tax: 'min:0|max:100',
				stock: 'integer|min:0|max:72',
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
