const modelName = "Transaction";
const { Transaction: Model, sequelize } = require("../database/models");
const Validator = require("../utils/validatorjs");

module.exports = {
  index: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {});

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
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
          'customer_identity.name' : 'required|string|between:1,255',
          'customer_identity.email': 'required|email',
	        'customer_identity.phone': 'required|integer|digits_between:9,12',
          'passenger_identity.*.airplane_id': "required|integer|exist:Airplanes,id",
          'passenger_identity.*.seat_id': "required|integer|exist:Seats,id", 
          'passenger_identity.*.passenger_title': "required|string|between:1,255",
          'passenger_identity.*.passenger_name': "required|string|between:1,255",
          'passenger_identity.*.passenger_family_name': "string|between:1,255",
          'passenger_identity.*.passenger_dob': "required|date",
          'passenger_identity.*.passenger_nationality': "required|string|between:1,255",
          'passenger_identity.*.passenger_identity_card': "required|string|size:16",
          'passenger_identity.*.passenger_identity_card_publisher': "string",
          'passenger_identity.*.passenger_identity_card_due_date': "date",
          'passenger_identity.*.passenger_type': "string|between:1,10"
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      // create transaction
      
      // create transaction details

      // const created = await Model.create(req.body);

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },

  show: async (req, res, next) => {
    try {
      const details = await Model.findOne({ where: {id: req.params.id}});

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
        customer_id: "required|integer|exist:Customers,id",
        date: "required|date",
        payment_date: "required|date",
        payment_due_date: "required|date",
        status: "string|min:0|max:255",
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      const updated = await Model.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

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
      const deleted = await Model.destroy({
        where: { id: req.params.id },
        returning: true,
      });

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
