#!/usr/bin/env nodejs
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const users = require('./routes/users');
const renders = require('./routes/renders');

app.use(compression());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);
app.use(renders);

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running at port: ', process.env.PORT || 3000);
});
