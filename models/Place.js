module.exports = (sequelize, DataTypes) => {
	const attributes = {
		placeName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const Place = sequelize.define('Place', attributes);
	Place.associate = (models) => {
		// This also adds a method on Package => Place.createPackage
		// Will add placeId to Package model
		Place.hasMany(models.Package);
	};

	return Place;
};
