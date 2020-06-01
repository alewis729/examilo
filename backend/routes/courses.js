const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Course = require("../models/Course");

// @route   GET api/courses
// @desc    get all user's courses
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const courses = await Course.find({ user: req.user.id });
		res.json(courses);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   GET api/courses/:id
// @desc    get course
// @access  private
router.get("/:id", auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
		res.json(course);
	} catch (err) {
		console.error(err.message);
		res.status(404).json({ id: 3, msg: "Object not found." });
	}
});

// @route   POST api/courses
// @desc    add new course
// @access  private
router.post(
	"/",
	[
		auth,
		[
			check("name", "A full name is required.")
				.not()
				.isEmpty(),
			check("abrev", "An abreviated name is required.")
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

		const { name, abrev } = req.body;

		try {
			const newCourse = new Course({
				user: req.user.id,
				name,
				abrev
			});

			const course = await newCourse.save();
			res.json(course);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

// @route   PUT api/courses/:id
// @desc    update course
// @access  private
router.put("/:id", auth, async (req, res) => {
	const { name, abrev } = req.body;

	// build course object
	const fields = {};
	if (name) fields.name = name;
	if (abrev) fields.abrev = abrev;

	try {
		let course = await Course.findById(req.params.id);

		if (!course) {
			return res.status(404).json({ id: 3, msg: "Object not found." });
		}

		// making sure that user owns course
		if (course.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		course = await Course.findByIdAndUpdate(
			req.params.id,
			{ $set: fields },
			{ new: true }
		);
		res.json(course);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
});

// @route   DELETE api/courses/:id
// @desc    delete course
// @access  private
router.delete("/:id", auth, async (req, res) => {
	try {
		let course = await Course.findById(req.params.id);

		if (!course)
			return res.status(404).json({ id: 3, msg: "Object not found." });

		// making sure that user owns course
		if (course.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		await Course.findByIdAndRemove(req.params.id);
		res.json({ id: 7, msg: "Object removed." });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
});

module.exports = router;
