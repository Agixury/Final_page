const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const userService = require('../services/users.service');

// @route POST /users
// register new user
router.post('/register', userService.validateRegisterInputs, async (req, res) => {
	// console.log('req.body after validation of inputs: ', req.body);
	if ((await db.User.findOne({ where: { username: req.body.username } })) || (await db.User.findOne({ where: { email: req.body.email } }))) {
		res.status(400).send({ message: 'Username or email is already taken' });
	}

	try {
		const params = {
			...req.body,
			hash: await bcrypt.hash(req.body.password, 10),
		};
		delete params.password;
		delete params.repeatPassword;

		// console.log('params: ', params);
		const user = await db.User.create(params);
		// console.log('user created, user: ', user);
		res.json({ message: 'user created', user: user });
	} catch (err) {
		console.error(err.name, ' ', err.message);
		res.status(500).json({ error: err.name, message: err.message });
	}
});
// @route POST /users
// user login
router.post('/login', userService.validateLoginInputs, async (req, res) => {
	// console.log('req.body after validation of inputs: ', req.body);

	try {
		const params = {
			...req.body,
			hash: await bcrypt.hash(req.body.password, 10),
		};
		delete params.password;
		delete params.repeatPassword;

		// console.log('params: ', params);
		const user = await db.User.create(params);
		// console.log('user created, user: ', user);
		res.json({ message: 'user created', user: user });
	} catch (err) {
		console.error(err.name, ' ', err.message);
		res.status(500).json({ error: err.name, message: err.message });
	}
});

// @route GET /users
router.get('/', async (req, res) => {
	const users = await db.User.findAll();
	res.json({ message: 'listing all users', users: users });
});

// @route GET /users/:id
router.get('/:id', (req, res) => {});

module.exports = router;
