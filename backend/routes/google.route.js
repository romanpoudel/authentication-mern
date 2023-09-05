import express from "express";
import passport from "passport";

const googleRouter = express.Router();

googleRouter.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

googleRouter.get(
	"/google/redirect",
	passport.authenticate("google", {successRedirect:"http://localhost:5173",failureRedirect: "/login" })
);

export default googleRouter