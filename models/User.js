const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const attributes = {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactNumber: {
			type: DataTypes.STRING,
		},
	};

	const options = {
		defaultScope: {
			attributes: { exclude: ['hash'] },
		},
		scopes: {
			withHash: { attributes: {} },
		},
	};

	return sequelize.define('users', attributes, options);
};
