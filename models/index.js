const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { host, user, password, database } = require('../config/db.config');

const db = {};

const initialize = async () => {
	const connection = await mysql.createConnection({ host, user, password });
	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

	const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

	db.User = require('./User')(sequelize);

	await sequelize.sync();
};

initialize();

module.exports = db;
