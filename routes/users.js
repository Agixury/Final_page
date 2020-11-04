const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../models');
const userService = require('../services/users.service');
const authorize = require('../middleware/authorize');

// @route POST /users/register
// register new user
router.post('/register', userService.validateRegisterInputs, async (req, res) => {
	if (
		(await db.User.findOne({ where: { contactNumber: req.body.contactNumber } })) ||
		(await db.User.findOne({ where: { email: req.body.email } }))
	) {
		return res.status(400).send({ message: 'contact number or email is already taken' });
	}

	try {
		const params = {
			...req.body,
			hash: await bcrypt.hash(req.body.password, 10),
		};
		delete params.password;
		delete params.repeatPassword;

		const user = await db.User.create(params);
		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		user.token = token;
		// console.log(user);
		return res.json({ message: 'user created', user: user });
	} catch (err) {
		console.error(err.name, ' ', err.message);
		return res.status(500).json({ error: err.name, message: err.message });
	}
});

// @route POST /users/login
// user login
router.post('/login', userService.validateLoginInputs, async (req, res) => {
	try {
		const email = req.body.email;
		const contactNumber = req.body.contactNumber;
		let user;

		if (email) {
			user = await db.User.scope('withHash').findOne({ where: { email } });
		}

		if (contactNumber) {
			user = await db.User.scope('withHash').findOne({ where: { contactNumber } });
		}

		if (!user || !(await bcrypt.compare(req.body.password, user.hash))) {
			return res.status(404).json({ message: 'Wrong credentials.' });
		}

		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
		user.token = token;
		return res.json({ message: 'user created', user: user });
	} catch (err) {
		console.error(err.name, ' ', err.message);
		return res.status(500).json({ error: err.name, message: err.message });
	}
});

// @route GET /users
router.get('/', authorize(), async (req, res) => {
	const users = await db.User.findAll();
	return res.json({ message: 'listing all users', users: users });
});

// @route GET /users/:id
router.get('/:id', (req, res) => {});

module.exports = router;
