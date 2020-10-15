module.exports = (sequelize, DataTypes) => {
	const attributes = {
		packageName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		numberOfPackages: {
			type: DataTypes.INTEGER, // available number of packages
			allowNull: false,
		},
		available: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		duration: {
			type: DataTypes.STRING, // standardize the time format (epoch, MM:DD:YY, so on)
			allowNull: false,
		},
	};

	const Package = sequelize.define('Package', attributes);
	Package.associate = (models) => {
		Package.belongsTo(models.PackageStore); // Will add PackageStoreId to Package model
	};

	return Package;
};
