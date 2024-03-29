const modelName = 'Customer';
const { Customer: Model, sequelize } = require('../database/models');
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
				name: 'required|alpha|between:1,255',
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
			const details = await sequelize.query(
			  `
			  SELECT
				c.id "customer_id",
				c.picture "picture",
				c.title_id "customer_title_id",
				t.name "customer_title",
				c.name "customer_name",
				c.family_name "customer_family_name",
				c.email "email",
				c.email_verified "email_verified",
				c.phone "phone"
			  FROM 
				"Customers" c
				LEFT JOIN "Titles" t ON (c.title_id = t.id)
			  WHERE 
				c.id = ${req.user.id}
			  `,
			  {
				type: sequelize.QueryTypes.SELECT,
			  },
			)
	  
				  if (!details) {
					  return res.status(404).json({
						  success: false,
						  message: `${modelName} with id ${req.user.id} not found!`,
						  error: {},
					  });
				  }
	  
				  return res.status(200).json({
					  success: true,
					  message: `Success get details of ${modelName} with id ${req.user.id}!`,
					  data: details,
				  });
			  } catch (error) {
				  next(error);
			  }
	},

	update: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.body, {
				title_id: 'integer|exist:Titles,id',
				name: 'string|between:1,255',
				family_name: 'string|between:1,255',
				email: "email|between:1,255|unique:Customers,email",
        phone: "numeric|digits_between:9,12|unique:Customers,phone",
        password: "string|between:8,255|confirmed",
        picture: "string",
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const updated = await Model.update(req.body, { where: { id: req.user.id }, returning: true });

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
