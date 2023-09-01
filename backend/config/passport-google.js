import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import userModel from "../models/auth.model.js";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:4000/auth/google/redirect",
			prompt: "select_account",
		},
		function (accessToken, refreshToken, profile, done) {
			userModel.findOne({ email: profile._json.email }).then((currentUser) => {
				if(currentUser){
					// already have this user
					console.log('user is: ', currentUser);
					done(null, currentUser);
				} else {
					// if not, create user in our db
					new userModel({
						email: profile.emails[0].value,
						userName: profile.displayName,
						
					}).save().then((newUser) => {
						console.log('created new user: ', newUser);
						done(null, newUser);
					});
				}
			});
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	userModel.findById(id).then(user=>done(null,user))
	console.log(id)
});
