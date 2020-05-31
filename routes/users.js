const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

// @route   POST api/users
// @desc    register user
// @access  public
router.post(
	"/",
	[
		check("name", "A Name is required.").not().isEmpty(),
		check("email", "A valid email is required.").isEmail(),
		check(
			"password",
			"A password with 6 or more characters is required."
		).isLength({ min: 6 })
		// check("productKey", "Your unique product key is required.").isLength({
		// 	min: 6
		// })
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

		const { name, email, password, productKey } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ id: 9, msg: "Object already exists." });
			}

			user = new User({
				name,
				email,
				password,
				productKey
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ id: 1, msg: "Server error." });
		}
	}
);

module.exports = router;
