const mongoose = require("mongoose");
const db = process.env.MONGODB;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log("> 👍 MongoDB Connected...");
	} catch (err) {
		console.log("> ❌ Connection to MongoDB failed...");
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
