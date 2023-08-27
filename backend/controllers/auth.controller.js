import userModel from "../models/auth.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default class AuthController {
	async registerUser(req, res) {
		const { email, userName, password, confirmPassword } = req.body;
		if (!validator.isEmail(email)) {
			return res
				.status(400)
				.json({ success: false, error: "Enter valid email!" });
		}
		try {
			const user = await userModel.findOne({ email: email });
			if (user) {
				return res
					.status(400)
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

			const token = jwt.sign(
				{ id: response._id, email },
				process.env.JWT_SECRET,
				{ expiresIn: "2h" }
			);
			//this sets only for frontend not in db
			response.token = token;
			response.password = undefined; //so they dont get access to original password
			res.status(200).json(response);
		} catch (err) {
			res.status(400).json(err);
		}
	}

	async loginController(req, res) {
		const { email, password } = req.body;

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
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});
			user.token = token;
			user.password = undefined;

			//cookie section
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.status(200).cookie("token", token, options).json({
				success: true,
				token,
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
		try {
			// Clear the user's token or session here
			// For example, if you're using JWT, you can set an empty token
			// or remove the token from cookies.

			const options = {
				expires: new Date(Date.now() - 1), // Setting the cookie expiration to a past date effectively deletes the cookie
				httpOnly: true,
			};

			res.status(200)
				.cookie("token", "", options)
				.json({ success: true, message: "Logged out successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
	}
}
