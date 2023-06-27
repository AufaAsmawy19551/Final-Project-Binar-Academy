const modelName = 'Flight'
const { Flight: Model, sequelize } = require('../database/models')
const Validator = require('../utils/validatorjs')

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

      const list = await sequelize.query(
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
          dpA.id = 1
          AND arA.id IN (3, 6, 8, 10, 11, 13, 14, 16, 18, 20)
          AND f.id % 9 = 1
          AND f.stock - (
            SELECT 
              COUNT(id)
            FROM
              "TransactionDetails"
            WHERE
              flight_id = f.id
          ) >= 1
          AND f.discount > 0
          AND f.departure_date::date = '2023-07-05'
        ORDER 
          BY f.departure_date
        LIMIT 
          10
			`,
        {
          type: sequelize.QueryTypes.SELECT,
        },
      )

      return res.status(200).json({
        success: true,
        message: `Success get list of ${modelName}s!`,
        data: list,
      })
    } catch (error) {
      next(error)
    }
  },
}
