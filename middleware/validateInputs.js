const validateInputs = (req, res, next, schema) => {
	const { error, value } = schema.validate(req.body, {
		abortEarly: false,
		allowUnknown: true,
		stripUnknown: true,
	});

	if (error) {
		const errorMessage = `Validation error: ${error.details.map((x) => x.message).join(', ')}`;
		res.status(400).send({ message: errorMessage });
	} else {
		req.body = value;
		next();
	}
};

module.exports = validateInputs;
