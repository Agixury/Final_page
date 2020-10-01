require('dotenv').config();
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');

const feedback = require('./routes/feedback');

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
	console.log('mongoDB connected');
});

const storage = new GridFsStorage({
	url: process.env.mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'documents',
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/feedback', feedback(upload));

app.listen(process.env.PORT || 3000, () => {
	console.log('Server running at port: ', process.env.PORT || 3000);
});
