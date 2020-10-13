const { DataTypes } = require('sequelize');

Organization.belongsTo(User, { foreignKey: 'owner_id' });
User.hasOne(Organization, { foreignKey: 'owner_id' });

module.exports = (sequelize) => {
	const attributes = {
		placeName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		packageName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		no_of_packages: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		available: {
            type: DataTypes.BOOLEAN,
            
		},
	};

	return sequelize.define('packages', attributes);
};
