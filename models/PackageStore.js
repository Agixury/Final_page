module.exports = (sequelize, DataTypes) => {
	const attributes = {
		txnID: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		bankTxnId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		txnAmount: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		txnType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gatewayName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bankName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		paymentMode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		txnDate: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const PackageStore = sequelize.define('PackageStore', attributes);
	PackageStore.associate = (models) => {
		PackageStore.hasMany(models.Package);
		PackageStore.hasMany(models.User);
	};

	return PackageStore;
};
