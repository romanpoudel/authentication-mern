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
	passport.authenticate("google", {failureRedirect: "/login" }),
	function (req, res) {
		res.redirect("/profile");
	}
);

export default googleRouter