const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const attributes = {
		placeName: {
			type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	
	};

	
	return sequelize.define('places', attributes);
};
