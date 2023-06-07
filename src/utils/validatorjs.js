const Validator = require('validatorjs');
const { sequelize } = require('../database/models');

Validator.registerAsync('exist', async function (value, requirement, attribute, passes) {
	const reqs = requirement.split(',')
	const exist = await sequelize.query(`SELECT * FROM "${reqs[0]}" WHERE ${reqs[1]} = '${value}'`, { type: sequelize.QueryTypes.SELECT });
	exist.length ? passes() : passes(false, `${attribute} doesn't exist in table ${reqs[0]}`);
});

Validator.registerAsync('unique', async function (value, requirement, attribute, passes) {
	const exist = await sequelize.query(`SELECT * FROM "${requirement}" WHERE ${attribute} = '${value}'`, { type: sequelize.QueryTypes.SELECT });
	!exist.length ? passes() : passes(false, `${attribute} must unique in table ${requirement}`);
});

module.exports = {
	validate: async (data, rules) => {
		const validation = new Validator(data, rules);

		let passes = () => {};
		let fails = () => {};

		const promise = new Promise((resolve) => {
			passes = () => {
				resolve(true);
			};
			fails = () => {
				resolve(false);
			};
		});

		validation.checkAsync(passes, fails);

		const result = await promise;

		return {
			failed: !result,
			errors: validation.errors.all(),
		};
	}
};
