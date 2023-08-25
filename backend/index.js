import express from "express";
import loginRouter from "./routes/login.route.js";
import signupRouter from "./routes/signup.route.js";
import mongoose from "mongoose";
import "dotenv/config";
import loginModel from "./models/auth.model.js";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello");
});
app.use(express.json());

app.use("/login", loginRouter);

app.use("/signup", signupRouter);

app.listen(4000, async () => {
	console.log("Server has started");
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
		console.log("Connected to DB.");
	} catch (err) {
		console.log(err);
	}
});
