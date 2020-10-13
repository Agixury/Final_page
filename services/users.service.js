const Joi = require('joi');
const validateInputs = require('../middleware/validateInputs');

const validateRegisterInputs = (req, res, next) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
		repeatPassword: Joi.ref('password'),
		contactNumber: Joi.string().min(9).max(14).pattern(new RegExp('^[0-9]+$')).required(),
	}).with('password', 'repeatPassword');

	validateInputs(req, res, next, schema);
};

const validateLoginInputs = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		contactNumber: Joi.string().min(9).max(14).pattern(new RegExp('^[0-9]+$')),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
	}).xor('email', 'contactNumber');

	validateInputs(req, res, next, schema);
};

module.exports = {
	validateRegisterInputs,
	validateLoginInputs,
};
