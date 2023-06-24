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
          dpC.name      "departure_city",
          dpC.time_zone "departure_city_time_zone",
          f.departure_date,
          arC.name      "arrival_city",
          arC.time_zone "arrival_city_time_zone",
          arC.image     "arrival_city_image",
          f.arrival_date,
          a.name        "airplane_name",
          a.logo        "airplane_logo",
          a.code        "airplane_code",
          c.name        "airplane_class",
          f.price,
          f.discount,
          f.tax,
          f.stock
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
          AND f.stock >= 1
          AND f.discount > 0
          AND f.departure_date::date = '2023-06-30'
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
