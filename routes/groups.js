const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Group = require("../models/Group");

// @route   GET api/groups
// @desc    get all user's groups
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const groups = await Group.find({
			user: req.user.id
		}).populate("students", ["_id", "code", "nameFirst", "nameLast"]);

		res.json(groups);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   GET api/groups/:id
// @desc    get a single group
// @access  private
router.get("/:id", auth, async (req, res) => {
	try {
		const group = await Group.findById(req.params.id).populate("students", [
			"_id",
			"code",
			"nameFirst",
			"nameLast"
		]);
		res.json(group);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   POST api/groups
// @desc    add new group
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

		const { name, abrev, desc, color, students, courses, exams } = req.body;

		// more validations
		const colors = ["yellow", "blue", "purple", "celeste", "green", "red"];
		const charLimit = 120;
		if (
			name.length > charLimit ||
			abrev.length > charLimit ||
			desc.length > charLimit
		) {
			res.status(500).json({
				id: 11,
				msg: "One or more fields exceeded character limit."
			});
		}

		try {
			const newGroup = new Group({
				user: req.user.id,
				name,
				abrev,
				desc,
				color: colors.includes(color) ? color : colors[0],
				students,
				courses,
				exams
			});

			const group = await newGroup.save();
			res.json(group);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

// @route   PUT api/groups/:id
// @desc    update group
// @access  private
router.put("/:id", auth, async (req, res) => {
	const { name, abrev, desc, color, students, courses, exams } = req.body;

	// more validations
	const colors = ["yellow", "blue", "purple", "celeste", "green", "red"];
	const charLimit = 120;
	if (
		name.length > charLimit ||
		abrev.length > charLimit ||
		desc.length > charLimit
	) {
		res.status(500).json({
			id: 11,
			msg: "One or more fields exceeded character limit."
		});
	}

	// build group object
	const fields = {};
	if (name) fields.name = name;
	if (abrev) fields.abrev = abrev;
	if (desc) fields.desc = desc;
	if (color) fields.color = colors.includes(color) ? color : colors[0];
	if (students) fields.students = students;
	if (courses) fields.courses = courses;
	if (exams) fields.exams = exams;

	try {
		let group = await Group.findById(req.params.id);

		if (!group) {
			return res.status(404).json({ id: 3, msg: "Object not found." });
		}

		// making sure that user owns group
		if (group.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		group = await Group.findByIdAndUpdate(
			req.params.id,
			{ $set: fields },
			{ new: true }
		);

		await group
			.populate("students", ["_id", "code", "nameFirst", "nameLast"])
			.execPopulate();
		res.json(group);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   DELETE api/groups/:id
// @desc    delete group
// @access  private
router.delete("/:id", auth, async (req, res) => {
	try {
		let group = await Group.findById(req.params.id);

		if (!group)
			return res.status(404).json({ id: 3, msg: "Object not found." });

		// making sure that user owns group
		if (group.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		await Group.findByIdAndRemove(req.params.id);
		res.json({ id: 7, msg: "Object removed." });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

module.exports = router;
