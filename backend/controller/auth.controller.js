import authModel from "../models/auth.model.js";
import validator from "validator";
import bcrypt from "bcrypt";

export default class AuthController {
	async registerUser(req, res) {
		const { email, userName, password, confirmPassword } = req.body;
		if (!validator.isEmail(email)) {
			return res.status(400).json({ error: "Enter valid email!" });
		}
		try {
			const user = await authModel.findOne({ email: email });
			if (user) {
				return res.status(400).json({ error: "User already exists" });
			}
			if (password !== confirmPassword) {
				return res.status(400).json({ error: "Passwords don't match" });
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const response = await authModel.create({
				email,
				userName,
				password:hashedPassword,
			});
			res.status(200).json({status:"success",message:"user created successfully"});
		} catch (err) {
			res.status(400).json(err);
		}
	}
}
