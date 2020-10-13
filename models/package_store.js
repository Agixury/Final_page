const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const attributes = {
		userId: {
			type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
		},
		packageId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
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
        orderId: {
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

	
	return sequelize.define('package_store', attributes);
};
