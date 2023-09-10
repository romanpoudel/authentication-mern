import userModel from "../models/auth.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default class AuthController {
	async registerUser(req, res) {
		const { email, userName, password, confirmPassword } = req.body;
		if (!email || !userName || !password || !confirmPassword) {
			return res.status(400).json("Incorrect form submission.");
		}
		if (!validator.isEmail(email)) {
			return res
				.status(400)
				.json({ success: false, error: "Enter valid email!" });
		}
		try {
			const user = await userModel.findOne({ email: email });
			if (user) {
				return res
					.status(409)
					.json({ success: false, error: "User already exists" });
			}
			if (password !== confirmPassword) {
				return res
					.status(400)
					.json({ success: false, error: "Passwords don't match" });
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const response = await userModel.create({
				email,
				userName,
				password: hashedPassword,
			});
			//cookie section
			const options = {
				expires: new Date(Date.now() + 60 * 1000),
				httpOnly: true,
			};
			const accessToken = jwt.sign(
				{ id: response._id, email },
				process.env.JWT_SECRET,
				{ expiresIn: "15s" }
			);
			const refreshToken = jwt.sign(
				{ id: response._id, email },
				process.env.JWT_SECRET,
				{ expiresIn: "1m" }
			);
			//this sets only for frontend not in db
			response.token = accessToken;
			response.password = undefined; //so they dont get access to original password
			res.status(200)
				.cookie("refreshToken", refreshToken, options)
				.header("accessToken", accessToken)
				.json({ success: true, response });
		} catch (err) {
			res.status(400).json(err);
		}
	}

	async loginController(req, res) {
		const { email, password } = req.body;
		console.log(req.body);
		try {
			const user = await userModel.findOne({ email });

			if (!user) {
				return res
					.status(401)
					.json({ success: false, message: "Invalid credentials" });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res
					.status(401)
					.json({ success: false, message: "Invalid credentials" });
			}

			// Password matches, authentication successful
			const accessToken = jwt.sign(
				{ id: user._id },
				process.env.JWT_SECRET,
				{
					expiresIn: "15s",
				}
			);

			//refresh token
			const refreshToken = jwt.sign(
				{ id: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: "1m" }
			);

			user.token = accessToken;
			user.password = undefined;

			//cookie section
			const options = {
				expires: new Date(Date.now() + 60 * 1000),
				httpOnly: true,
				sameSite: "strict",
			};
			res.status(200)
				.cookie("refreshToken", refreshToken, options)
				.header("accessToken", accessToken)
				.json({
					success: true,
					token: accessToken,
					user,
					message: "Authentication successful",
				});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	async logoutController(req, res) {
		//google logout
		if(req.user){
			req.logout();
			return res.redirect("/");
		}

		try {
			// Clear the user's token or session here
			// For example, if you're using JWT, you can set an empty token
			// or remove the token from cookies.

			const options = {
				expires: new Date(Date.now() - 1), // Setting the cookie expiration to a past date effectively deletes the cookie
				httpOnly: true,
			};
			res.removeHeader("accessToken");
			res.status(200)
				.cookie("refreshToken", "", options)
				// .removeHeader("accessToken") it has to be done separately before sending main response
				.json({ success: true, message: "Logged out successfully" });

			//write a logout code for passsport js
			// req.logout();
			// res.redirect("/");

		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}

	async refreshController(req, res) {
		try {
			// Get the token from the cookie
			const token = req.cookies.refreshToken;

			// If we don't have a token in our request
			if (!token) {
				return res.status(401).json({
					success: false,
					message: "Not authorized to access this route",
				});
			}

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get the user from the decoded token
			const user = await userModel.findById(decoded.id);

			// If we don't have a user
			if (!user) {
				return res.status(404).json({
					success: false,
					message: "No user found",
				});
			}

			// Password matches, authentication successful
			const newToken = jwt.sign(
				{ id: user._id },
				process.env.JWT_SECRET,
				{
					expiresIn: "15s",
				}
			);

			// Send the token in the response
			res.status(200).header("accessToken", newToken).json({
				success: true,
				token: newToken,
				user,
				message: "Refresh successful",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}
}
