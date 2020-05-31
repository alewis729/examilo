const express = require("express");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const app = express();

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log("---------- ---------- ---------- ---------- ----------");
	console.log(`> 🚀 Server ready on port: ${port}`);
});
