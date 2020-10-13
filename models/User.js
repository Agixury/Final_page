module.exports = (sequelize, DataTypes) => {
	const attributes = {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
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
		confirmed: {
			type: DataTypes.BOOLEAN, // use this to indicate email confirmation
			defaultValue: false,
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

	const User = sequelize.define('User', attributes, options);
	User.associate = (models) => {
		User.belongsTo(models.PackageStore); // Will add PackageStoreId to User model
	};

	return User;
};
