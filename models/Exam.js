const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	name: {
		type: String,
		required: true
	},
	evalDate: { type: Date, default: Date.now },
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "group"
	},
	qty: {
		type: Number,
		required: true
	},
	p_corr: {
		type: Number,
		default: 4
	},
	p_incor: {
		type: Number,
		default: -1
	},
	p_blank: {
		type: Number,
		default: 0
	},
	courses: [
		{
			c: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "course"
			},
			qFrom: { type: Number },
			qTo: { type: Number }
		}
	],
	answers: [{ type: String, required: true }],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("exam", ExamSchema);
