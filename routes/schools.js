const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const School = require("../models/School");

// @route   GET api/schools
// @desc    get school
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const school = await School.findOne({ user: req.user.id });
		if (school === null) {
			res.status(404).json({
				id: 3,
				msg: "Object not found."
			});
		} else {
			res.json(school);
		}
	} catch (err) {
		console.error(err.message);
		res.status(404).json({
			id: 4,
			msg: "Object not found because of an unexpected error."
		});
	}
});

// @route   POST api/schools
// @desc    add new school
// @access  private
router.post(
	"/",
	[
		auth,
		[
			check("name", "A name is required for a school instance.")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				id: 5.1,
				msg: "Some fields are invalid.",
				errors: errors.array()
			});
		}

		const {
			logo,
			name,
			abrev,
			desc,
			period,
			address,
			email,
			phone1,
			phone2
		} = req.body;

		try {
			// more validations
			const charLimit = 120;
			if (
				name.length > charLimit ||
				abrev.length > charLimit ||
				desc.length > charLimit ||
				period.length > charLimit ||
				address.length > charLimit ||
				email.length > charLimit ||
				phone1.length > charLimit ||
				phone2.length > charLimit
			) {
				return res.status(500).json({
					id: 11,
					msg: "One or more fields exceeded character limit."
				});
			}

			const regex = /^([0-9a-zñáéíóú_\-',.° ]){1,100}$/i;

			if (
				!regex.test(name) &&
				!regex.test(abrev) &&
				!regex.test(desc) &&
				!regex.test(period) &&
				!regex.test(address) &&
				!regex.test(email) &&
				!regex.test(phone1) &&
				!regex.test(phone2)
			) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid."
				});
			}

			const newSchool = new School({
				user: req.user.id,
				logo,
				name,
				abrev,
				desc,
				period,
				address,
				email,
				phone1,
				phone2
			});

			const school = await newSchool.save();
			res.json(school);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

// @route   PUT api/schools/:id
// @desc    update school
// @access  private
router.put("/:id", auth, async (req, res) => {
	const {
		logo,
		name,
		abrev,
		desc,
		period,
		address,
		email,
		phone1,
		phone2
	} = req.body;

	// build school object
	const schoolFields = {};

	if (logo) {
		if (logo.fileName && logo.filePath) {
			schoolFields.logo = logo;
		} else {
			return res
				.status(400)
				.json({ id: 6, msg: "Object partially empty." });
		}
	}
	if (name) schoolFields.name = name;
	if (abrev) schoolFields.abrev = abrev;
	if (desc) schoolFields.desc = desc;
	if (period) schoolFields.period = period;
	if (address) schoolFields.address = address;
	if (email) schoolFields.email = email;
	if (phone1) schoolFields.phone1 = phone1;
	if (phone2) schoolFields.phone2 = phone2;

	try {
		let school = await School.findById(req.params.id);

		if (!school)
			return res.status(404).json({
				id: 4,
				msg: "Object not found because of an unexpected error."
			});

		// making sure that user owns school
		if (school.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		school = await School.findByIdAndUpdate(
			req.params.id,
			{ $set: schoolFields },
			{ new: true }
		);
		res.json(school);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			id: 4,
			msg: "Object not found because of an unexpected error."
		});
	}
});

// @route   DELETE api/schools/:id
// @desc    delete school
// @access  private
router.delete("/:id", auth, async (req, res) => {
	try {
		let school = await School.findById(req.params.id);

		if (!school)
			return res.status(404).json({ id: 3, msg: "Object not found." });

		// making sure that user owns school
		if (school.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		await School.findByIdAndRemove(req.params.id);
		res.json({ msg: `School ${school.name} removed.` });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

module.exports = router;
