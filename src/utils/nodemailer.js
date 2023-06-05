require('dotenv').config();
const nodemailer = require('nodemailer');
const { oauth2Client } = require('./oauth2');
const ejs = require('ejs');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_SENDER_EMAIL } = process.env;

// set credential
oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

module.exports = {
	sendEmail: (to, subject, html) => {
		return new Promise(async (resolve, reject) => {
			const accessToken = await oauth2Client.getAccessToken();

			const transport = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					type: 'Oauth2',
					user: GOOGLE_SENDER_EMAIL,
					clientId: GOOGLE_CLIENT_ID,
					clientSecret: GOOGLE_CLIENT_SECRET,
					refreshToken: GOOGLE_REFRESH_TOKEN,
					accessToken: accessToken,
				},
			});

			const response = transport.sendMail({ to, subject, html });
			return resolve(response);
		});
	},

	getHtml: (filename, data) => {
		return new Promise((resolve, reject) => {
			const path = `${__dirname}/../views/email-template/${filename}`;

			ejs.renderFile(path, data, (err, data) => {
				if (err) {
					return reject(err);
				}

				return resolve(data);
			});
		});
	},
};
