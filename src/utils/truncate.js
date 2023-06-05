const { Supplier, Component, Product } = require('../models');

module.exports = {
	supplier: async () => {
		await Supplier.destroy({ truncate: true, restartIdentity: true, cascade: true });
	},
	component: async () => {
		await Component.destroy({ truncate: true, restartIdentity: true, cascade: true });
	},
	product: async () => {
		await Product.destroy({ truncate: true, restartIdentity: true, cascade: true });
	},
};
