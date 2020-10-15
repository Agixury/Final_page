const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize');
const { host, user, password, database } = require('../config/db.config');

const db = {};

const initialize = async () => {
	const connection = await mysql.createConnection({ host, user, password });
	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

	const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

	db.User = require('./User')(sequelize, DataTypes);
	db.Place = require('./Place')(sequelize, DataTypes);
	db.Package = require('./Package')(sequelize, DataTypes);
	db.PackageStore = require('./PackageStore')(sequelize, DataTypes);

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	await sequelize.sync({ force: true }); // reset databse
	// await sequelize.sync();
};

initialize();

module.exports = db;
