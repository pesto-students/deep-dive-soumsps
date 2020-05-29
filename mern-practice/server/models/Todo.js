const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
	task: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	complete: {
		type: Boolean
	}
});

module.exports = mongoose.model('Todo', TodoSchema);

