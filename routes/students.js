const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student");
const Group = require("../models/Group");

// @route   GET api/students
// @desc    get all students
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const students = await Student.find({ user: req.user.id })
			.populate("group", ["name", "abrev"])
			.sort({
				date: -1
			});
		res.json(students);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   GET api/students/:id
// @desc    get a student
// @access  private
router.get("/:id", auth, async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate(
			"group",
			["name", "abrev"]
		);
		res.json(student);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   POST api/students
// @desc    add new student
// @access  private
router.post(
	"/",
	[
		auth,
		[
			check("group", "The group of the student is required.")
				.not()
				.isEmpty(),
			check("nameFirst", "First name is required.")
				.not()
				.isEmpty(),
			check("nameLast", "Last name is required.")
				.not()
				.isEmpty(),
			check("code", "The code of the student is required.").isNumeric()
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

		const { group: groupId, nameFirst, nameLast, code } = req.body;

		try {
			// more validations
			if (!mongoose.Types.ObjectId.isValid(groupId)) {
				return res
					.status(500)
					.json({ id: 3, msg: "Object not found." });
			}

			const group = await Group.findById(groupId);
			if (!group) {
				return res
					.status(500)
					.json({ id: 3, msg: "Object not found." });
			}

			const charLimit = 120;
			if (nameFirst.length > charLimit || nameLast.length > charLimit) {
				return res.status(500).json({
					id: 11,
					msg: "One or more fields exceeded character limit."
				});
			}

			const reNames = /^([a-zñáéíóú, ]){1,75}$/i;
			const reNums = /^\d*$/;

			if (!reNames.test(nameLast)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "nameLast"
				});
			}
			if (!reNames.test(nameFirst)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "nameFirst"
				});
			}
			if (!reNums.test(code)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "code"
				});
			}

			const students = await Student.find({ user: req.user.id });

			for (let st of students) {
				if (st.code.toString() === code.toString()) {
					return res.status(500).json({
						id: 10,
						msg: "Similar object already exists."
					});
				}
			}

			const newStudent = new Student({
				user: req.user.id,
				group: groupId,
				nameFirst,
				nameLast,
				code
			});

			const student = await newStudent.save();
			await student.populate("group", ["name", "abrev"]).execPopulate();

			await Group.findByIdAndUpdate(
				groupId,
				{ $set: { students: [...group.students, student._id] } },
				{ new: true }
			);

			res.json(student);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

// @route   POST api/students/many
// @desc    add multiple students
// @access  private
router.post("/many", auth, async (req, res) => {
	try {
		const studentsInDb = await Student.find({ user: req.user.id });

		const groupId = req.body[0].group;
		const group = await Group.findById(groupId);

		if (!group) {
			return res.status(500).json({ id: 3, msg: "Object not found." });
		}

		const arr = req.body.map((obj) => {
			// validations
			const { nameFirst, nameLast, code } = obj;

			if (!mongoose.Types.ObjectId.isValid(groupId)) {
				return res
					.status(500)
					.json({ id: 3, msg: "Object not found." });
			}

			const charLimit = 120;
			if (nameFirst.length > charLimit || nameLast.length > charLimit) {
				return res.status(500).json({
					id: 11,
					msg: "One or more fields exceeded character limit."
				});
			}

			const reNames = /^([a-zñáéíóú, ]){1,75}$/i;
			const reNums = /^\d*$/;

			if (!reNames.test(nameLast)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "nameLast"
				});
			}
			if (!reNames.test(nameFirst)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "nameFirst"
				});
			}
			if (!reNums.test(code)) {
				return res.status(500).json({
					id: 5,
					msg: "Some fields are invalid.",
					field: "code"
				});
			}

			for (let st of studentsInDb) {
				if (st.code.toString() === code.toString()) {
					return res.status(500).json({
						id: 10,
						msg: "Similar object already exists."
					});
				}
			}

			return new Student({
				user: req.user.id,
				group: groupId,
				nameFirst,
				nameLast,
				code
			});
		});

		let newStudentIds = [];

		Student.collection.insertMany(arr, (err, docs) => {
			if (err) throw err;
			else {
				docs.ops.forEach(async (doc, i) => {
					newStudentIds.push(doc._id);

					await doc
						.populate("group", ["name", "abrev"])
						.execPopulate();

					if (i === docs.ops.length - 1) {
						await Group.findByIdAndUpdate(
							groupId,
							{
								$set: {
									students: [
										...group.students,
										...newStudentIds
									]
								}
							},
							{ new: true }
						);

						return res.json(docs.ops);
					}
				});
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   PUT api/students/one/:id
// @desc    update student
// @access  private
router.put("/one/:id", auth, async (req, res) => {
	const { group: groupId, nameFirst, nameLast, code } = req.body;

	// build student object and more validations...
	const fields = {};
	const charLimit = 120;
	const reNames = /^([a-zñáéíóú, ]){1,75}$/i;
	const reNums = /^\d*$/;

	if (groupId !== null) {
		if (!mongoose.Types.ObjectId.isValid(groupId)) {
			return res.status(500).json({ id: 3.1, msg: "Object not found." });
		}

		const group = await Group.findById(groupId);
		if (!group) {
			return res.status(500).json({ id: 3.2, msg: "Object not found." });
		}

		fields.group = groupId;
	}
	if (nameFirst) {
		if (nameFirst.length > charLimit) {
			return res.status(500).json({
				id: 11,
				msg: "One or more fields exceeded character limit."
			});
		}

		if (!reNames.test(nameFirst)) {
			return res.status(500).json({
				id: 5,
				msg: "Some fields are invalid.",
				field: "nameFirst"
			});
		}

		fields.nameFirst = nameFirst;
	}

	if (nameLast) {
		if (nameLast.length > charLimit) {
			return res.status(500).json({
				id: 11,
				msg: "One or more fields exceeded character limit."
			});
		}

		if (!reNames.test(nameLast)) {
			return res.status(500).json({
				id: 5,
				msg: "Some fields are invalid.",
				field: "nameLast"
			});
		}

		fields.nameLast = nameLast;
	}
	if (code) {
		if (!reNums.test(code)) {
			return res.status(500).json({
				id: 5,
				msg: "Some fields are invalid.",
				field: "code"
			});
		}

		const students = await Student.find({ user: req.user.id });

		for (let st of students) {
			if (
				st.code.toString() === code.toString() &&
				req.params.id !== st._id.toString()
			) {
				return res.status(500).json({
					id: 10,
					msg: "Similar object already exists."
				});
			}
		}

		fields.code = code;
	}

	try {
		let student = await Student.findById(req.params.id);
		if (!student) {
			return res.status(404).json({ id: 3, msg: "Object not found." });
		}

		const oldGroupId = student.group;

		// making sure that user owns student
		if (student.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		student = await Student.findByIdAndUpdate(
			req.params.id,
			{ $set: fields },
			{ new: true }
		);
		await student.populate("group", ["name", "abrev"]).execPopulate();

		if (groupId !== null) {
			// delete student from old group
			const oldGroup = await Group.findById(oldGroupId);
			const oldGroupUpdatedStudents = oldGroup.students.filter(
				(st) => st._id.toString() !== student._id.toString()
			);

			await Group.findByIdAndUpdate(
				oldGroupId,
				{ $set: { students: oldGroupUpdatedStudents } },
				{ new: true }
			);

			// add student to new group
			const group = await Group.findById(groupId);

			await Group.findByIdAndUpdate(
				groupId,
				{ $set: { students: [...group.students, student._id] } },
				{ new: true }
			);
		}
		res.json(student);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   PUT api/students/many
// @desc    update many students
// @access  private
router.put("/many", auth, async (req, res) => {
	try {
		const groupId = req.body.group;
		const ids = req.body.data;

		// validations
		if (!mongoose.Types.ObjectId.isValid(groupId)) {
			return res
				.status(500)
				.json({ id: 3, msg: "Object not found.", obj: "group" });
		}

		const group = await Group.findById(groupId);
		if (!group) {
			return res
				.status(500)
				.json({ id: 3, msg: "Object not found.", obj: "group" });
		}

		if (ids.length < 1) {
			return res.status(500).json({
				id: 5,
				msg: "Some fields are invalid.",
				obj: "ids"
			});
		}

		if (ids.length > 30) {
			return res.status(500).json({
				id: 12,
				msg: "Exceeded limit of items to apply action."
			});
		}

		// making sure that user owns all the students
		const students = await Student.find({
			_id: { $in: ids }
		});

		for (let st of students) {
			if (st.user.toString() !== req.user.id) {
				return res.status(401).json({ id: 0, msg: "Not authorized." });
			}

			// delete student from old group
			const oldGroup = await Group.findById(st.group);
			const oldGroupUpdatedStudents = oldGroup.students.filter(
				(s) => s._id.toString() !== st._id.toString()
			);

			await Group.findByIdAndUpdate(
				st.group,
				{ $set: { students: oldGroupUpdatedStudents } },
				{ new: true }
			);
		}

		const update = await Student.updateMany(
			{ user: req.user.id, _id: { $in: ids } },
			{ $set: { group: groupId } }
		);

		if (update.n === ids.length) {
			const students = await Student.find({
				user: req.user.id,
				_id: { $in: ids }
			}).populate("group", ["name", "abrev"]);

			// add students to new group
			await Group.findByIdAndUpdate(
				groupId,
				{ $set: { students: [...group.students, ...ids] } },
				{ new: true }
			);

			res.json(students);
		} else {
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   DELETE api/students/one/:id
// @desc    delete student
// @access  private
router.delete("/one/:id", auth, async (req, res) => {
	try {
		let student = await Student.findById(req.params.id);

		if (!student)
			return res.status(404).json({ id: 3, msg: "Object not found." });

		// making sure that user owns  student
		if (student.user.toString() !== req.user.id) {
			return res.status(401).json({ id: 0, msg: "Not authorized." });
		}

		await Student.findByIdAndRemove(req.params.id);
		res.json({ id: 7, msg: "Object removed." });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   DELETE api/students/many
// @desc    delete many students
// @access  private
router.delete("/many", auth, async (req, res) => {
	try {
		const ids = req.body;

		if (ids.length < 1) {
			return res.status(500).json({
				id: 5,
				msg: "Some fields are invalid.",
				obj: "ids"
			});
		}

		// making sure that user owns all the students
		const students = await Student.find({
			_id: { $in: ids }
		});

		for (let st of students) {
			if (st.user.toString() !== req.user.id) {
				return res.status(401).json({ id: 0, msg: "Not authorized." });
			}
		}

		await Student.deleteMany(
			{ user: req.user.id, _id: { $in: ids } },
			(err) => {
				if (err) {
					res.status(500).json({ id: 1, msg: "Server error." });
					console.error(err);
				} else {
					res.json({ id: 7, msg: "Objects(s) removed." });
				}
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

module.exports = router;
