const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));
app.use(fileUpload());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/schools", require("./routes/schools"));
app.use("/api/uploads", require("./routes/uploads"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/groups", require("./routes/groups"));
app.use("/api/students", require("./routes/students"));
app.use("/api/exams", require("./routes/exams"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client/build", "index.html"))
	);
}

app.listen(port, () => {
	console.log("---------- ---------- ---------- ---------- ----------");
	console.log(`> 🚀 Server ready on port: ${port}`);
});
