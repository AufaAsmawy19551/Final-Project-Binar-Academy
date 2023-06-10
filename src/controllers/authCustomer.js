const modelName = 'Customer'
const { Customer, sequelize } = require('../database/models')
const Validator = require('../utils/validatorjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = process.env

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body
      const validation = await Validator.validate(req.body, {
        name: 'required|string',
        email: 'required|email|unique:Customers,email',
        password: 'required|string|between:8,255|confirmed',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }
      const hashPassword = await bcrypt.hash(password, 10)
      // buat service dan response di sini!

      const customer = await Customer.create(req.body, {
        name,
        email,
        password: hashPassword,
      })

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: {
          name: customer.name,
          email: customer.email,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  saveOtp: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {
        otp_code: 'required|string',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // buat service dan response di sini!
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const validation = await Validator.validate(req.body, {
        email: 'required|email',
        password: 'required|string|between:8,255',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      const customer = await Customer.findOne({ where: { email } })

      if (!customer) {
        return res.status(400).json({
          success: false,
          message: 'credential is not valid!',
          data: {},
        })
      }

      const passwordCorrect = await bcrypt.compare(password, customer.password)

      if (!passwordCorrect) {
        return res.status(400).json({
          success: false,
          message: 'credential is not valid!',
          data: null,
        })
      }

      const payload = {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      }

      const token = await jwt.sign(payload, JWT_SECRET_KEY)
      return res.status(200).json({
        success: true,
        message: 'login success!',
        data: {
          token: token,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  requestForgotPassword: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {})

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // buat service dan response di sini!
    } catch (error) {
      next(error)
    }
  },

  saveForgotPassword: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {})

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // buat service dan response di sini!
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {})

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // buat service dan response di sini!
    } catch (error) {
      next(error)
    }
  },
}
