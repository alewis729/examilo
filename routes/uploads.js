const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const path = require("path");
const xlsx = require("xlsx");

// @route   POST api/uploads
// @desc    upload school logo
// @access  private
router.post("/", auth, (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ id: 8, msg: "No file was uploaded." });
	}

	const file = req.files.file;
	let fileName = file.name;
	const fileExt = path.extname(fileName).substr(1);
	const fileTypes = ["png", "jpg", "jpeg"];

	if (!fileTypes.includes(fileExt)) {
		return res
			.status(400)
			.json({ id: 5, msg: "File is not of image type." });
	}

	if (fileName.indexOf(" ") >= 0) {
		fileName = fileName.split(" ").join("_");
	}

	file.mv(
		`${__dirname}/../front/public/user_uploads/school_logos/${fileName}`,
		(err) => {
			if (err) {
				console.error(err);
				return res
					.status(500)
					.json({ id: 1, msg: "Server error.", error: err });
			}

			res.json({
				fileName: fileName,
				filePath: `/user_uploads/school_logos/${fileName}`
			});
		}
	);
});

// @route   POST api/uploads/students
// @desc    upload excel file with students
// @access  private
router.post("/students/", auth, (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ id: 8, msg: "No file was uploaded." });
	}

	const file = req.files.file;
	let fileName = file.name;
	const fileExt = path.extname(fileName).substr(1);

	if (fileExt !== "xlsx") {
		return res
			.status(400)
			.json({ id: 5, msg: "File is not of type '.xlsx'." });
	}

	if (fileName.indexOf(" ") >= 0) {
		fileName = fileName.split(" ").join("_");
	}

	const filePathFull = `${__dirname}/../front/public/user_uploads/students/${fileName}`;

	file.mv(filePathFull, (err) => {
		if (err) {
			console.error(err);
			return res
				.status(500)
				.json({ id: 1, msg: "Server error.", error: err });
		}

		const wb = xlsx.readFile(filePathFull);
		const sheet = wb.Sheets[wb.SheetNames[0]];
		const data = xlsx.utils.sheet_to_json(sheet);

		if (data.length > 0) {
			return res.json(data);
		} else {
			return res.status(500).json({ id: 3, msg: "Data not found" });
		}
	});
});

module.exports = router;
