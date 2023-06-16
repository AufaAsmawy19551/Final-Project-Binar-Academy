const modelName = "Customer";
const { Customer, sequelize } = require("../database/models");
const Validator = require("../utils/validatorjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP, sendOTP } = require("../utils/otp");
const nodemailer = require("../utils/nodemailer");
const oauth2 = require('../utils/oauth2')
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, phone, password } = req.body;
      const validation = await Validator.validate(req.body, {
        name: "required|string",
        email: "required|email|unique:Customers,email",
        phone: "required|integer|digits_between:9,12|unique:Customers,phone",
        password: "required|string|between:8,255|confirmed",
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }
      // buat service dan response di sini!

      const hashPassword = await bcrypt.hash(password, 10);
      const customer = await Customer.create({
        name: name,
        email: email,
        email_verified: false,
		    phone: phone, 
        password: hashPassword, 
      })

      // const otpCode = generateOTP();
      // await sendOTP(email, otpCode);

      // await saveOtpCodeToDatabase(email, otpCode);
      // code untuk mengirim kode otp ke email

      return res.status(200).json({
        success: true,
        message: `Success create new ${modelName}!`,
        data: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  saveOtp: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.body, {
        otp_code: "required|string",
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      const { otp_code } = req.query;
      const email = req.body.email;

      const getOtpCodeFromDatabase = async (email) => {
        try {
          const customer = await Customer.findOne({ where: { email } });
          return customer.otpCode;
        } catch (error) {
          throw error;
        }
      };

      const savedOtpCode = await getOtpCodeFromDatabase(email);
      if (otp_code !== savedOtpCode) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP code",
          data: null,
        });
      }

      const html = await nodemailer.getHtml("otp.ejs", {
        name: customer.name,
        url,
      });
      nodemailer.sendMail(customer.email, "kode otp", html);

      // Refresh OTP ke email
      const newOTP = generateOTP();
      await sendOTP(email, newOTP);
      await saveOtpCodeToDatabase(email, newOTP);

      // buat service dan response di sini!
      return res.status(200).json({
        success: true,
        message: "OTP code is valid",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const validation = await Validator.validate(req.body, {
        email: "required|email",
        password: "required|string|between:8,255",
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      const customer = await Customer.findOne({ where: { email } });

      if (!customer) {
        return res.status(400).json({
          success: false,
          message: "Haven't registered an account yet, please register an account first!",
          data: null,
        });
      }

      if (customer.user_type == "google" && !user.password) {
        return res.status(400).json({
          status: false,
          message:
            "your accont is registered with google oauth, you need to login with google!",
          data: null,
        });
      }

      const passwordCorrect = await bcrypt.compare(password, customer.password);

      if (!passwordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Username or Password not valid!",
          data: null,
        });
      }

      const payload = {
        id: customer.id,
        name: customer.name,
        type: "customer",
        email_verified: customer.email_verified,
      };

      const token = await jwt.sign(payload, JWT_SECRET_KEY)
      Customer.update({token: token}, {where: {id: customer.id}});
      return res.status(200).json({
        success: true,
        message: "login success!",
        data: {
          token: token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  userDetails: async (req, res, next) => {
		try {
			const details = await Customer.findOne({
          where: { id: req.user.id }, 
          attributes:[
            'id',
            'name',
            'email',
            'email_verified',
            'phone',
            'createdAt',
            'updatedAt',
          ]
        });

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

  requestForgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const validation = await Validator.validate(req.body, {
        email: "required|email",
      });

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      // buat service dan response di sini!
      const customer = await Customer.findOne({ where: { email } });
      if (customer) {
        const payload = {
          id: customer.id,
        };
        const token = await jwt.sign(payload, JWT_SECRET_KEY);
        const url = `${req.protocol}://${req.get(
          "host"
        )}/api/web/customer-auth/reset-password?token=${token}`;

        const html = await nodemailer.getHtml("resetPassword.ejs", {
          name: customer.name,
          url,
        });
        nodemailer.sendMail(customer.email, "Reset password request", html);
      }

      return res.status(200).json({
        success: true,
        message: "we will send a email if the email is registered!",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
  resetPasswordPage: (req, res) => {
    const {token} = req.query;
    return res.render('auth/reset-password', {message: null, token});
},
  saveForgotPassword: async (req, res, next) => {
    try {
      const { new_password, confirm_new_password } = req.body;
      const { token } = req.query;

      // const validation = await Validator.validate(req.body, {
      //   password: "required|string|between:8,255|confirmed",
      // });

      // if (validation.failed) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Bad Request",
      //     data: validation.errors,
      //   });
      // }

      // buat service dan response di sini!
      if (!token) {
        return res.render("auth/reset-password", {
          message: "invalid token!",
          token,
        });
      }
      if (new_password != confirm_new_password) {
        return res.render("auth/reset-password", {
          message: "confirm password does not match!",
          token,
        });
      }
      const data = await jwt.verify(token, JWT_SECRET_KEY);

      const hashPassword = await bcrypt.hash(new_password, 10);
      const updated = await Customer.update(
        { password: hashPassword },
        { where: { id: data.id } }
      );
      if (updated[0] == 0) {
        return res.render("auth/reset-password", {
          message: `reset password failed!`,
          token,
        });
      }

      return res.send("successfully changed the password");
    } catch (error) {
      next(error);
    }
  },

  googleOauth2: async (req, res) => {
    const { code } = req.query;
    if (!code) {
      const googleLoginUrl = oauth2.generateAuthUrl();
      return res.redirect(googleLoginUrl);
    }

    await oauth2.setCreadentials(code);
    const { data } = await oauth2.getUserData();

    let customer = await Customer.findOne({ where: { email: data.email } });
    if (!customer) {
      customer = await User.create({
        name: data.name,
        email: data.email,
        user_type: "google",
      });
    }

    const payload = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    };

    const token = await jwt.sign(payload, JWT_SECRET_KEY);
    return res.status(200).json({
      status: true,
      message: "login success!",
      data: {
        token: token,
      },
    });
  },

  logout: async (req, res, next) => {
    try {
      const validation = await Validator.validate(req.query, {});

      if (validation.failed) {
        return res.status(400).json({
          success: false,
          message: "Bad Request",
          data: validation.errors,
        });
      }

      // buat service dan response di sini!
      return res.status(200).json({
        success: true,
        message: "Logout Successful",
        data: null, 
      })
    } catch (error) {
      next(error);
    }
  },
};
