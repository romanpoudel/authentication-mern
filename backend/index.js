import express, { urlencoded } from "express";
import loginRouter from "./routes/login.route.js";
import logoutRouter from "./routes/logout.route.js";
import signupRouter from "./routes/signup.route.js";
import googleRouter from "./routes/google.route.js";
import mongoose from "mongoose";
import "dotenv/config";
import loginModel from "./models/auth.model.js";
import cookieParser from "cookie-parser";
import auth from "./middlewares/auth.js";
import cors from "cors";
import "./config/passport-google.js";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials:true
	})
);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
app.use(passport.initialize())
app.use(passport.session());
app.get("/", (req, res) => {
	// res.send("Hello");
	res.send('<a href="/auth/google">Signup with google</a>');
});
app.use(express.json());
app.use(cookieParser());


app.use("/login", loginRouter);
// app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/auth", googleRouter);

app.get("/dashboard", auth, (req, res) => {
	//you can access value req.user set from middleware
	console.log(req.user);
	res.send("Dashboard");
});

const validate=(req,res,next)=>{
	req.user?next():res.sendStatus(401)
}
app.get("/profile",validate,(req,res)=>{
	res.send("Profile")
})
app.get("/logout",(req,res)=>{
	req.logout((err)=>{
		if(err) throw error
		else{
			req.session.destroy();
			res.redirect("/");
		}
	})
})

app.listen(4000, async () => {
	console.log("Server has started");
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
		console.log("Connected to DB.");
	} catch (err) {
		console.log(err);
	}
});
