const modelName = 'Notification';
const { Notification: Model, CustomerNotification, Customer, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	index: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {
				title: 'string|between:1,255',
        		description: 'string|between:1,255',
        		date: 'date',
			});

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}
			
			const list = await sequelize.query(
				`
				SELECT
				  n.id "notification_id",
				  cat.name"category",
				  n.title "notification_title",
				  n.description "notification_description",
				  n.date "date",
				  cn.is_read "is_read"
				FROM 
				  "Customers" c
				  RIGHT JOIN "CustomerNotifications" cn ON (c.id = cn.customer_id)
				  RIGHT JOIN "Notifications" n ON (cn.notification_id = n.id)
				  RIGHT JOIN "Categories" cat ON (n.category_id = cat.id)
				WHERE 
				  c.id = ${req.user.id}
				ORDER BY 
					n.date DESC
				`,
				{
				  type: sequelize.QueryTypes.SELECT,
				},
			  )  

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
				title: 'required|string|between:1,255',
    			description: 'required|string|between:1,255',
    			date: 'required|date',
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
				  n.id "notification_id",
				  cat.name "category",
				  n.title "notification_title",
				  n.description "notification_description",
				  n.date "date"
				FROM 
				  "Notifications" n
				  LEFT JOIN "Categories" cat ON (n.category_id = cat.id)
				WHERE 
				  n.id = ${req.params.id}
				`,
				{
				  type: sequelize.QueryTypes.SELECT,
				},
			  )


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

			const {id} = req.params;
			const updated = await CustomerNotification.update({is_read: true}, {where: {notification_id: id, customer_id: req.user.id}, returning: true });
			

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
