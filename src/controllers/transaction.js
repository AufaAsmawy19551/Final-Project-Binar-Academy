const modelName = 'Transaction'
const {
  Transaction: Model,
  TransactionDetail,
  Flight,
  Airplane,
  Airport,
  Class,
  Seat,
  Facility,
  sequelize,
} = require('../database/models')
const Validator = require('../utils/validatorjs')
const transactionDetail = require('./transactionDetail')

module.exports = {
  index: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {})

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      const list = await Model.findAll()

      return res.status(200).json({
        success: true,
        message: `Success get list of ${modelName}s!`,
        data: list,
      })
    } catch (error) {
      next(error)
    }
  },

  store: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.body, {
        'customer_identity.name': 'required|string|between:1,255',
        'customer_identity.email': 'required|email',
        'customer_identity.phone': 'required|integer|digits_between:9,12',
        'passenger_identity.*.flight_id': 'required|integer|exist:Flights,id',
        'passenger_identity.*.seat_id': 'required|integer|exist:Seats,id',
        'passenger_identity.*.passenger_title': 'required|string|between:1,255',
        'passenger_identity.*.passenger_name': 'required|string|between:1,255',
        'passenger_identity.*.passenger_family_name': 'string|between:1,255',
        'passenger_identity.*.passenger_dob': 'required|date',
        'passenger_identity.*.passenger_nationality':
          'required|string|between:1,255',
        'passenger_identity.*.passenger_identity_card':
          'required|string|size:16',
        'passenger_identity.*.passenger_identity_card_publisher': 'string',
        'passenger_identity.*.passenger_identity_card_due_date': 'date',
        'passenger_identity.*.passenger_type': 'string|between:1,10',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // create transaction
      const transaction = await Model.create({
        customer_id: 1,
        payment_due_date: Date.now() + 1000 * 3600 * 24 * 2,
        status: 'unpaid',
      })

      // create transaction details for all passenger_identity
      req.body.passenger_identity.forEach(async (passenger) => {
        // create transaction details
        await TransactionDetail.create({
          transaction_id: transaction.id,
          flight_id: passenger.flight_id,
          seat_id: passenger.seat_id,
          passenger_title: passenger.passenger_title,
          passenger_name: passenger.passenger_name,
          passenger_family_name: passenger.passenger_family_name,
          // passenger_dob: passenger.passenger_dob,
          passenger_nationality: passenger.passenger_nationality,
          passenger_identity_card: passenger.passenger_identity_card,
          passenger_identity_card_publisher:
            passenger.passenger_identity_card_publisher,
          // passenger_identity_card_due_date: passenger.passenger_identity_card_publisher,
          passenger_type: passenger.passenger_type,
          boarding_status: false,
        })
      })

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: {},
      })
    } catch (error) {
      next(error)
    }
  },

  show: async (req, res, next) => {
    try {
        

      const details = await sequelize.query(
        `
        SELECT 
          
          t.id "transaction_id",
          cs.id "customer_id",
          cs.name "customer_name",
          t.date "date",
          t.payment_date "payment_date",
          t.payment_due_date "payment_due_date",
          t.status "payment_status",
          a.id "airplane_id",
          a.name "airplane_name",
          a.code "airplane_logo",
          a.logo "airplane_code",
          s.id "seat_id",
          s.number "seat_number",
          c.id "class_id",
          c.name "class",
          f.id "flight_id",
          dpA.id "departure_airport_id",
          dpA.name "departure_airport",
          dpC.name "departure_city",
				  arA.id "arrival_airport_id",
          arA.name "arrival_airport",
				  arC.name "arrival_city",
          tD.id "transaction_detail_id",
          tD.passenger_title "passenger_title",
          tD.passenger_name "passenger_name",
          tD.passenger_family_name "passenger_family_name",
          tD.passenger_dob "passenger_dob",
          tD.passenger_nationality "passenger_nationality",
          tD.passenger_identity_card "passenger_identity_cardy",
          tD.passenger_identity_card_publisher "passenger_identity_card_publisher",
          tD.passenger_identity_card_due_date "passenger_identity_card_due_date",
          tD.passenger_type "passenger_type",
          tD.passenger_type "passenger_type",
          tD.boarding_status "boarding_status"
        FROM 
          "TransactionDetails" tD
          LEFT JOIN "Seats" s ON (tD.seat_id = s.id)
          LEFT JOIN "Flights" f ON (tD.flight_id = f.id)
          LEFT JOIN "Transactions" t ON (tD.transaction_id = t.id)
          LEFT JOIN "Customers" cs ON (t.customer_id = cs.id)
          LEFT JOIN "Airplanes" a ON (f.airplane_id = a.id)
          LEFT JOIN "Classes" c ON (a.class_id = c.id)
          LEFT JOIN "Airports" dpA ON (f.departure_airport_id = dpA.id)
				  LEFT JOIN "Airports" arA ON (f.arrival_airport_id = arA.id)
          LEFT JOIN "Cities" dpC ON (dpA.city_id = dpC.id)
				  LEFT JOIN "Cities" arC ON (arA.city_id = arC.id)
        WHERE 
          tD.id = ${req.params.id}
        `, 
      {
        type: sequelize.QueryTypes.SELECT,
      });

      details[0].facilities = await sequelize.query(
        `
        SELECT
          f.name "facilities"
        FROM 
          "AirplaneFacilities" af LEFT JOIN "Facilities" f ON(af.facility_id = f.id)
        WHERE
          af.airplane_id = ${details[0].airplane_id}
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        },
      );
      

      if (!details) {
        return res.status(404).json({
          success: false,
          message: `${modelName} with id ${req.params.id} not found!`,
          error: {},
        })
      }

      return res.status(200).json({
        success: true,
        message: `Success get details of ${modelName} with id ${req.params.id}!`,
        data: details,
      })
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.body, {
        customer_id: 'required|integer|exist:Customers,id',
        date: 'required|date',
        payment_date: 'required|date',
        payment_due_date: 'required|date',
        status: 'string|min:0|max:255',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      const updated = await Model.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      })

      if (!updated[1][0]) {
        return res.status(404).json({
          success: false,
          message: `${modelName} with id ${req.params.id} not found!`,
          error: {},
        })
      }

      return res.status(200).json({
        success: true,
        message: `Success update ${modelName} with id ${req.params.id}!`,
        data: updated[1][0],
      })
    } catch (error) {
      next(error)
    }
  },

  destroy: async (req, res, next) => {
    try {
      const deleted = await Model.destroy({
        where: { id: req.params.id },
        returning: true,
      })

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `${modelName} with id ${req.params.id} not found!`,
          error: {},
        })
      }

      return res.status(200).json({
        status: true,
        message: `Success delete ${modelName} with id ${req.params.id}!`,
        data: {},
      })
    } catch (error) {
      next(error)
    }
  },
}
