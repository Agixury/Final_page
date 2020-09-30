const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = Schema({
	query: { type: String, default: '', index: true },
	name: { type: String },									//, required: [true, "can't be blank"]
	email: { type: String },								//lowercase: true,required: [true, "can't be blank"],match: [/\S+@\S+\.\S+/, 'is invalid'],index: true,required: true,
	contactNumber: { type: String },						//, required: [true, "can't be blank"]
	description: { type: String, default: '' },
	document: { type: String, default: '' },
});

module.exports = new mongoose.model('Feedback', feedbackSchema);
