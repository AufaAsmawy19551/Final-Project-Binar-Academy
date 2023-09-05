require('dotenv').config();
const pg = require('pg')
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT = 'postgres' } = process.env;

module.exports = {
	development: {
		host: DB_HOST,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		port: DB_PORT,
		dialect: DB_DIALECT,
		dialectModule: pg,
	},
	test: {
		host: DB_HOST,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		port: DB_PORT,
		dialect: DB_DIALECT,
		dialectModule: pg,
	},
	production: {
		host: DB_HOST,
		database: DB_NAME,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		port: DB_PORT,
		dialect: DB_DIALECT,
		dialectModule: pg,
	},
};
