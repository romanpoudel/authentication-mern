import express, { urlencoded } from "express";
import loginRouter from "./routes/login.route.js";
import logoutRouter from "./routes/logout.route.js";
import signupRouter from "./routes/signup.route.js";
import mongoose from "mongoose";
import "dotenv/config";
import loginModel from "./models/auth.model.js";
import cookieParser from "cookie-parser";
import auth from "./middlewares/auth.js";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello");
});
app.use(express.json());
app.use(cookieParser());

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

app.get("/dashboard", auth, (req, res) => {
	//you can access value req.user set from middleware
	console.log(req.user);
	res.send("Dashboard");
});

app.listen(4000, async () => {
	console.log("Server has started");
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
		console.log("Connected to DB.");
	} catch (err) {
		console.log(err);
	}
});
