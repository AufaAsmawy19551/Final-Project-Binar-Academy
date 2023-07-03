const modelName = 'Banner';
const { Banner: Model, sequelize } = require('../database/models');
const Validator = require('../utils/validatorjs');

module.exports = {
	index: async (req, res, next) => {
		try {
			const validation = await Validator.validate(req.query, {
        picture: 'string',
      })

			if (validation.failed) {
				return res.status(400).json({
					success: false,
					message: 'Bad Request',
					data: validation.errors,
				});
			}

			const baseURL = `${req.protocol}://${req.get('host')}`

			const list = await sequelize.query(
				`
				SELECT
				  b.id,
					CONCAT('${baseURL}/images/banner/', '', b.picture) as "picture"
				FROM 
				  "Banners" b
				`,
				{
				  type: sequelize.QueryTypes.SELECT,
				},
			);  

			return res.status(200).json({
				success: true,
				message: `Success get list of ${modelName}s!`,
				data: list,
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
};
