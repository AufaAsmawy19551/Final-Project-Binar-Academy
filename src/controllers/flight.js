const modelName = 'Flight'
const { request } = require('express')
const {
  Flight: Model,
  Airport,
  Airplane,
  Facility,
  Class,
  sequelize,
} = require('../database/models')
const Validator = require('../utils/validatorjs')

module.exports = {
  index: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {
        departure_airport_id: 'required|integer|exist:Airports,id',
        destination_airport_id: 'required|integer|exist:Airports,id',
        departure_date: 'required|date',
        number_passenger: 'required|integer|min:1',
        class_id: 'required|integer|exist:Classes,id',
        is_promo: 'required|boolean',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      let list = [];
      req.query.is_promo = (/true/).test(req.query.is_promo)

      if(req.query.is_promo){
        list = await sequelize.query(
          `
			    SELECT 
            f.id,
            dpA.id        "departure_airport_id",
			    	dpA.name      "departure_airport",
			    	dpA.code      "departure_airport_code",
			    	dpC.name      "departure_city",
			    	dpC.code      "departure_city_code",
			    	dpC.time_zone "departure_city_time_zone",
			    	f.departure_date,
            arA.id        "arrival_airport_id",
			    	arA.name      "arrival_airport",
			    	arA.code      "arrival_airport_code",
			    	arC.name      "arrival_city",
			    	arC.code      "arrival_city_code",
			    	arC.time_zone "arrival_city_time_zone",
            arC.image     "arrival_city_image",
			    	f.arrival_date,
			    	a.name        "airplane_name",
			    	a.logo        "airplane_logo",
			    	a.code        "airplane_code",
            c.id          "airplane_class_id",
			    	c.name        "airplane_class",
			    	f.price,
			    	f.discount,
			    	f.tax,
			    	f.stock - (
              SELECT 
                COUNT(id)
              FROM
                "TransactionDetails"
              WHERE
                flight_id = f.id
            ) "stock"
          FROM
            "Flights" f
            INNER JOIN "Airports" dpA ON (f.departure_airport_id = dpA.id)
            INNER JOIN "Airports" arA ON (f.arrival_airport_id = arA.id)
            INNER JOIN "Airplanes" a ON (f.airplane_id = a.id)
            INNER JOIN "Classes" c ON (a.class_id = c.id)
            INNER JOIN "Cities" dpC ON (dpA.city_id = dpC.id)
            INNER JOIN "Cities" arC ON (arA.city_id = arC.id)
          WHERE
            dpA.id = ${req.query.departure_airport_id} 
            AND arA.id = ${req.query.destination_airport_id}
            AND f.discount = ((arA.id * 9) % 5) * 10 + 10
            AND f.stock - (
              SELECT
                COUNT(id)
              FROM
                "TransactionDetails"
              WHERE
                flight_id = f.id
            ) >= 1
            AND f.departure_date::DATE = '${req.query.departure_date}'
          ORDER BY
            f.departure_date
			    `,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        )
      }else {
        list = await sequelize.query(
          `
			    SELECT 
            f.id,
			    	dpA.name "departure_airport",
			    	dpA.code "departure_airport_code",
			    	dpC.name "departure_city",
			    	dpC.code "departure_city_code",
			    	dpC.time_zone "departure_city_time_zone",
			    	f.departure_date,
			    	arA.name "arrival_airport",
			    	arA.code "arrival_airport_code",
			    	arC.name "arrival_city",
			    	arC.code "arrival_city_code",
			    	arC.time_zone "arrival_city_time_zone",
			    	f.arrival_date,
			    	a.name "airplane_name",
			    	a.logo "airplane_logo",
			    	a.code "airplane_code",
			    	c.name "airplane_class",
			    	f.price,
			    	f.discount,
			    	f.tax,
			    	f.stock - (
              SELECT 
                COUNT(id)
              FROM
                "TransactionDetails"
              WHERE
                flight_id = f.id
            ) "stock"
			    FROM 
			    	"Flights" f
			    	INNER JOIN "Airports" dpA ON (f.departure_airport_id = dpA.id)
			    	INNER JOIN "Airports" arA ON (f.arrival_airport_id = arA.id)
			    	INNER JOIN "Airplanes" a ON (f.airplane_id = a.id)
			    	INNER JOIN "Classes" c ON (a.class_id = c.id)
			    	INNER JOIN "Cities" dpC ON (dpA.city_id = dpC.id)
			    	INNER JOIN "Cities" arC ON (arA.city_id = arC.id)
          WHERE
            dpA.id = ${req.query.departure_airport_id} 
            AND arA.id = ${req.query.destination_airport_id}
            AND c.id = ${req.query.class_id}
            AND f.stock - (
              SELECT 
                COUNT(id)
              FROM
                "TransactionDetails"
              WHERE
                flight_id = f.id
            ) >= ${req.query.number_passenger}
            AND f.departure_date::date = '${req.query.departure_date}'
          ORDER BY 
            f.departure_date
			    `,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        )
      }

      

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
        departure_airport_id: 'required|integer|exist:Airports,id',
        arrival_airport_id: 'required|integer|exist:Airports,id',
        airplane_id: 'required|integer|exist:Airplanes,id',
        departure_date: 'required|date',
        arrival_date: `required|date`,
        price: 'required|integer|min:0',
        discount: 'integer|min:0|max:100',
        tax: 'integer|min:0|max:100',
        stock: 'required|integer|min:0|max:72',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      const created = await Model.create(req.body)

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: created,
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
          f.id,
			  	dpA.name "departure_airport",
			  	dpA.code "departure_airport_code",
			  	dpC.name "departure_city",
			  	dpC.code "departure_city_code",
			  	dpC.time_zone "departure_city_time_zone",
			  	f.departure_date,
			  	arA.name "arrival_airport",
			  	arA.code "arrival_airport_code",
			  	arC.name "arrival_city",
			  	arC.code "arrival_city_code",
			  	arC.time_zone "arrival_city_time_zone",
			  	f.arrival_date,
			  	a.id "airplane_id",
			  	a.name "airplane_name",
			  	a.logo "airplane_logo",
			  	a.code "airplane_code",
			  	c.name "airplane_class",
			  	f.price,
			  	f.discount,
			  	f.tax,
			  	f.stock - (
            SELECT 
              COUNT(id)
            FROM
              "TransactionDetails"
            WHERE
              flight_id = f.id
          ) "stock"
			  FROM 
			  	"Flights" f
			  	LEFT JOIN "Airports" dpA ON (f.departure_airport_id = dpA.id)
			  	LEFT JOIN "Airports" arA ON (f.arrival_airport_id = arA.id)
			  	LEFT JOIN "Airplanes" a ON (f.airplane_id = a.id)
			  	LEFT JOIN "Classes" c ON (a.class_id = c.id)
			  	LEFT JOIN "Cities" dpC ON (dpA.city_id = dpC.id)
			  	LEFT JOIN "Cities" arC ON (arA.city_id = arC.id)
        WHERE 
          f.id = ${req.params.id}
			  `,
        {
          type: sequelize.QueryTypes.SELECT,
        },
      )

      const facilities = await sequelize.query(
        `
        SELECT
          f.name "facility_name"
        FROM 
          "AirplaneFacilities" af LEFT JOIN "Facilities" f ON(af.facility_id = f.id)
        WHERE
          af.airplane_id = ${details[0].airplane_id}
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        },
      )

      const seats = await sequelize.query(
        `
        SELECT
          s.id,
          s.number,
          CASE WHEN td.id IS NULL THEN FALSE ELSE TRUE END AS "available"
        FROM
          "Seats" s
          LEFT JOIN "TransactionDetails" td ON td.seat_id = s.id
        WHERE
          td.flight_id = ${details[0].id} OR td.flight_id IS NULL
        ORDER BY
          s.id
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        },
      )

      const facilitiesArray = []
      facilities.forEach((e) => {
        facilitiesArray.push(e.facility_name)
      })

      details[0].facilities = facilitiesArray
      details[0].seats = seats

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
        departure_airport_id: 'integer|exist:Airports,id',
        arrival_airport_id: 'integer|exist:Airports,id',
        airplane_id: 'integer|exist:Airplanes,id',
        departure_date: 'date',
        arrival_date: `date`,
        price: 'integer|min:0',
        discount: 'min:0|max:100',
        tax: 'min:0|max:100',
        stock: 'integer|min:0|max:72',
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
