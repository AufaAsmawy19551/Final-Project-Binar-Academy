const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const otpExpiryTime = 300;
module.exports = {
  generateOTP: () => {
    return {
      code: otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false,
      }),
      expiresAt: Date.now() + otpExpiryTime * 1000,
    }; // Calculate the expiration timestamp}
  },

  sendOTP: async (email, otpCode) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "YourEmailService",
        auth: {
          user: "your-email@example.com",
          pass: "your-email-password",
        },
      });

      // Define the email options
      const mailOptions = {
        from: "your-email@example.com",
        to: email,
        subject: "OTP Verification Code",
        text: `Your OTP code is: ${otpCode}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log("OTP code sent successfully!");
    } catch (error) {
      console.error("Error sending OTP code:", error);
    }
  },
};
