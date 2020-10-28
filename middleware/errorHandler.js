const errorHandler = (err, req, res, next) => {
	switch (true) {
		case err.name === 'UnauthorizedError':
			return res.status(401).json({ message: 'Unauthorized' });

		case typeof err === 'string':
			const is404 = err.toLowerCase().endsWith('not found');
			const statusCode = is404 ? 404 : 400;
			return res.status(statusCode).json({ message: err });

		default:
			return res.status(500).json({ message: err.message });
	}
};

module.exports = errorHandler;
