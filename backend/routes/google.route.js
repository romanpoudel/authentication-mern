import express from "express";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		prompt: "select_account",
	})
);

googleRouter.get(
	"/google/redirect",
	passport.authenticate("google", {failureRedirect: "http://localhost:5173/login" }),(req,res)=>{
		console.log("successfull")
		res.redirect("http://localhost:5173/")
	}
);

export default googleRouter