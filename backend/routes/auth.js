const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

// @route   GET api/auth
// @desc    get logged in user
// @access  private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select([
			"-password",
			"-productKey"
		]);
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ id: 1, msg: "Server error." });
	}
});

// @route   POST api/auth
// @desc    auth user & get token
// @access  public
router.post(
	"/",
	[
		check("email", "A registered email is required").isEmail(),
		check("password", "A password is required.").exists()
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

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ id: 3, msg: "Object not found." });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({
					id: 5,
					msg: "Invalid password."
				});
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				jwtSecret,
				{
					expiresIn: 28800 // dev mode: 8hrs
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

module.exports = router;
