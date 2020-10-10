// const router = require('express').Router();
// const mongoose = require('mongoose');

// const Feedback = require('../model/Feedback');

// module.exports = (upload) => {
// 	const connect = mongoose.createConnection(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// 	let gfs;
// 	connect.once('open', () => {
// 		gfs = new mongoose.mongo.GridFSBucket(connect.db, {
// 			bucketName: 'documents',
// 		});
// 	});

// 	// @route POST /api/feedback
// 	// set input file's name='document' in frontend
// 	router.post('/', upload.single('document'), (req, res, next) => {
// 		console.log('[REQUEST] body: ', req.body);
// 		console.log('[REQUEST] file: ', req.file);

// 		let document = null;
// 		if (req.file) {
// 			document = req.file.filename;
// 		}

// 		const feedback = new Feedback({
// 			...req.body,
// 			document,
// 		});

// 		feedback
// 			.save()
// 			.then((feedback) => {
// 				res.status(200).json({
// 					success: true,
// 					feedback,
// 				});
// 			})
// 			.catch((err) => res.status(500).json(err));
// 	});

// 	// @route GET /api/feedback
// 	// get all feedbakcs
// 	router.get('/', async (req, res) => {
// 		try {
// 			const feedbacks = await Feedback.find();

// 			if (!feedbacks || feedbacks.length === 0) {
// 				return res.status(200).send('No feedbacks found');
// 			}

// 			return res.json({
// 				success: true,
// 				feedbacks,
// 			});
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send(error.message);
// 		}
// 	});

// 	// @route GET /api/feedback/:document
// 	// get document corresponding to feedback
// 	router.get('/:filename', (req, res) => {
// 		try {
// 			const filename = req.params.filename;
// 			gfs.find({ filename }).toArray((err, documents) => {
// 				if (!documents[0] || documents.length === 0) {
// 					return res.status(200).json({
// 						success: false,
// 						message: 'No document available',
// 					});
// 				}

// 				res.status(200).json({
// 					success: true,
// 					document: documents[0],
// 				});
// 			});
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send(error.message);
// 		}
// 	});

// 	return router;
// };
