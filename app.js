#!/usr/bin/env nodejs
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');

const users = require('./routes/users');

app.use(compression());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

app.get('/', (req, res) => {
	return res.render('index');
});

app.get('/hotels', (req, res) => {
	return res.render('hotels');
});

app.get('/about', (req, res) => {
	return res.render('about');
});

app.get('/contact', (req, res) => {
	return res.render('contact');
});

app.get('/giftcards', (req, res) => {
	return res.render('giftcards');
});

app.get('/partner', (req, res) => {
	return res.render('partner');
});

app.get('/refund', (req, res) => {
	return res.render('refund');
});

app.get('/terms', (req, res) => {
	return res.render('terms');
});

app.get('/refer', (req, res) => {
	return res.render('refer');
});

app.get('/career', (req, res) => {
	return res.render('career');
});

app.get('/faq', (req, res) => {
	return res.render('faq');
});

app.get('/tours', (req, res) => {
	return res.render('tours');
});

app.get('/blogs', (req, res) => {
	return res.render('blogs');
});

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running at port: ', process.env.PORT || 3000);
});
