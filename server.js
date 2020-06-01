const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./backend/config");
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));
app.use(fileUpload());

app.use("/api/users", require("./backend/routes/users"));
app.use("/api/auth", require("./backend/routes/auth"));
app.use("/api/schools", require("./backend/routes/schools"));
app.use("/api/uploads", require("./backend/routes/uploads"));
app.use("/api/courses", require("./backend/routes/courses"));
app.use("/api/groups", require("./backend/routes/groups"));
app.use("/api/students", require("./backend/routes/students"));
app.use("/api/exams", require("./backend/routes/exams"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "build", "index.html"))
	);
}

app.listen(port, () => {
	console.log("---------- ---------- ---------- ---------- ----------");
	console.log(`> 🚀 Server ready on port: ${port}`);
});
