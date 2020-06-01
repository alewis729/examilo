const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Exam = require("../models/Exam");

// @route   GET api/exams
// @desc    get all school's or grade's exams
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const exams = await Exam.find({ user: req.user.id })
			.populate("group", ["name", "abrev"])
			.populate("courses.course", "name")
			.sort({ date: -1 });
		res.json(exams);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 3, msg: "Object not found." });
	}
});

// @route   POST api/exams
// @desc    add new exam
// @access  private
router.post(
	"/",
	[
		auth,
		[
			check("group", "The group id of the exam is required.")
				.not()
				.isEmpty(),
			check("name", "The full name of the exam is required.")
				.not()
				.isEmpty(),
			check("qty", "The number of questions of the exam is required.")
				.not()
				.isEmpty(),
			check("answers", "The answers of the exam are required.")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				id: 5,
				msg: "Some fields are invalid.",
				errors: errors.array()
			});
		}

		const {
			name,
			evalDate,
			group,
			qty,
			p_corr,
			p_incorr,
			p_blank,
			courses,
			answers
		} = req.body;

		try {
			const newExam = new Exam({
				user: req.user.id,
				name,
				evalDate,
				group,
				qty,
				p_corr,
				p_incorr,
				p_blank,
				courses,
				answers
			});

			const exam = await newExam.save();
			res.json(exam);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

// @route   PUT api/exams/:id
// @desc    update exam
// @access  private
router.put("/:id", auth, async (req, res) => {
	const {
		name,
		evalDate,
		group,
		qty,
		p_corr,
		p_incorr,
		p_blank,
		courses,
		answers
	} = req.body;

	// build exam object
	const fields = {};
	if (name) fields.name = name;
	if (evalDate) fields.evalDate = evalDate;
	if (group) fields.group = group;
	if (qty) fields.qty = qty;
	if (p_corr) fields.p_corr = p_corr;
	if (p_incorr) fields.p_incorr = p_incorr;
	if (p_blank) fields.p_blank = p_blank;
	if (courses) fields.courses = courses;
	if (answers) fields.answers = answers;

	try {
		let exam = await Exam.findById(req.params.id);

		if (!exam) {
			return res.status(404).json({ id: 3, msg: "Object not found." });
		}

		// making sure that user owns the exam
		if (exam.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		exam = await Exam.findByIdAndUpdate(
			req.params.id,
			{ $set: fields },
			{ new: true }
		);
		res.json(exam);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   DELETE api/exams/:id
// @desc    delete exam
// @access  private
router.delete("/:id", auth, async (req, res) => {
	try {
		let exam = await Exam.findById(req.params.id);

		if (!exam)
			return res.status(404).json({ id: 3, msg: "Object not found." });

		// making sure that user owns school
		if (exam.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		await Exam.findByIdAndRemove(req.params.id);
		res.json({ id: 7, msg: "Object removed." });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

module.exports = router;
