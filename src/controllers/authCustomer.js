const modelName = 'Customer'
const { Customer, sequelize } = require('../database/models')
const Validator = require('../utils/validatorjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('../utils/nodemailer')
const oauth2 = require('../utils/oauth2')
const { JWT_SECRET_KEY } = process.env

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, phone, password } = req.body
      const validation = await Validator.validate(req.body, {
        name: 'required|string|between:1,255',
        email: 'required|email|between:1,255|unique:Customers,email',
        phone: 'required|numeric|digits_between:9,12|unique:Customers,phone',
        password: 'required|string|between:8,255|confirmed',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }
      const generateOTP = `${Math.floor(100000 + Math.random() * 999999)}`
      const saltRound = 10
      const otpCode = await bcrypt.hash(generateOTP, saltRound)

      // buat service dan response di sini!

      const hashPassword = await bcrypt.hash(password, 10)
      const customer = await Customer.create({
        name: name,
        title_id: 1,
        email: email,
        email_verified: false,
        phone: phone,
        password: hashPassword,
        otp_code: otpCode,
      })
      console.log(customer)

      const html = await nodemailer.getHtml('otp.ejs', {
        name: customer.name,
        generateOTP,
      })

      nodemailer.sendMail(customer.email, 'send OTP', html)

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: {
          url: `/otp?email=${email}`
        },
      })
    } catch (error) {
      next(error)
    }
  },

  saveOtp: async (req, res, next) => {
    try {
      const { otp_code } = req.body
      const email = req.body.email

      const validation = await Validator.validate(req.body, {
        otp_code: 'required|numeric|digits:6',
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
          message: 'Invalid email',
          data: null,
        })
      }
      const otpCorrect = await bcrypt.compare(otp_code, customer.otp_code)
      if (!otpCorrect) {
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP code',
          data: null,
        })
      }

      const payload = {
        id: customer.id,
        name: customer.name,
        type: 'customer',
        email_verified: true,
      }

      const token = await jwt.sign(payload, JWT_SECRET_KEY)
      Customer.update({ token: token , verified: true}, { where: { id: customer.id } })

      // buat service dan response di sini!
      return res.status(200).json({
        success: true,
        message: 'Success OTP code is valid',
        data: {
          token: token
        },
      })
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body

      const validation = await Validator.validate(req.body, {
        email: 'required|email|between:1,255',
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
          message:
            "Haven't registered an account yet, please register an account first!",
          data: null,
        })
      }

      if (customer.user_type == 'google' && !customer.password) {
        return res.status(400).json({
          status: false,
          message:
            'your accont is registered with google oauth, you need to login with google!',
          data: null,
        })
      }

      const passwordCorrect = await bcrypt.compare(password, customer.password)

      if (!passwordCorrect) {
        return res.status(400).json({
          success: false,
          message: 'Username or Password not valid!',
          data: null,
        })
      }

      const payload = {
        id: customer.id,
        name: customer.name,
        type: 'customer',
        email_verified: customer.email_verified,
      }

      const token = await jwt.sign(payload, JWT_SECRET_KEY)
      Customer.update({ token: token }, { where: { id: customer.id } })
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

  userDetails: async (req, res, next) => {
    try {
      const details = await sequelize.query(
        `
        SELECT
          c.id "customer_id",
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
        })
      }

      return res.status(200).json({
        success: true,
        message: `Success get details of ${modelName} with id ${req.user.id}!`,
        data: details,
      })
    } catch (error) {
      next(error)
    }
  },

  requestForgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body

      const validation = await Validator.validate(req.body, {
        email: 'required|email',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
      }

      // buat service dan response di sini!
      const customer = await Customer.findOne({ where: { email } })
      if (customer) {
        const payload = {
          id: customer.id,
        }
        const token = await jwt.sign(payload, JWT_SECRET_KEY)
        const url = `${process.env.FE_ENV}/reset-password?token=${token}`

        const html = await nodemailer.getHtml('resetPassword.ejs', {
          name: customer.name,
          url,
        })
        nodemailer.sendMail(customer.email, 'Reset password request', html)
      }

      return res.status(200).json({
        success: true,
        message: 'we will send a email if the email is registered!',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },
  resetPasswordPage: (req, res) => {
    const { token } = req.query
    // return res.redirect(`${process.env.FE_ENV}/reset-password?token=${token}`, { message: null, token });
  },
  saveForgotPassword: async (req, res, next) => {
    try {
      const { password } = req.body
      const { token } = req.query

      const validation = await Validator.validate(req.body, {
        password: 'required|string|between:8,255|confirmed',
      })

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: 'Bad Request',
          data: validation.errors,
        })
        // return res.redirect(`${process.env.FE_ENV}/reset-password?token=${token}`, {
        //   message: "confirm password does not match!",
        // });
      }

      // buat service dan response di sini!
      if (!token) {
        return res.status(403).json({
          success: false,
          message: 'Token Invalid',
          data: null,
        })
        // return res.redirect(`${process.env.FE_ENV}/reset-password?token=${token}`, {
        //   message: "invalid token!",
        // });
      }

      const data = await jwt.verify(token, JWT_SECRET_KEY)

      const hashPassword = await bcrypt.hash(password, 10)
      const updated = await Customer.update(
        { password: hashPassword },
        { where: { id: data.id } },
      )

      // if (updated[0] == 0) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Failed update password",
      //     data: null,
      //   });
      // return res.render("auth/reset-password", {
      //   message: `reset password failed!`,
      //   token,
      // });
      // }

      return res.status(200).json({
        success: true,
        message: 'Success update password',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },

  googleOauth2: async (req, res) => {
    const { code } = req.query
    if (!code) {
      const googleLoginUrl = oauth2.generateAuthUrl()
      return res.redirect(googleLoginUrl)
    }

    await oauth2.setCreadentials(code)
    const { data } = await oauth2.getUserData()

    let customer = await Customer.findOne({ where: { email: data.email } })
    if (!customer) {
      customer = await User.create({
        name: data.name,
        email: data.email,
        user_type: 'google',
      })
    }

    const payload = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    }

    const token = await jwt.sign(payload, JWT_SECRET_KEY)
    return res.status(200).json({
      status: true,
      message: 'login success!',
      data: {
        token: token,
      },
    })
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

      Customer.update({ token: null }, { where: { id: req.user.id } })
      return res.status(200).json({
        success: true,
        message: 'Logout Successful',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },
}
