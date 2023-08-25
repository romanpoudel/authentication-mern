import authModel from "../models/auth.model.js";

export default class AuthController {
	async registerUser(req, res) {
		try {
			const response = await authModel.create({
				email: "romfdsfan",
				userName: "sdfgsg",
                password:"sgfsg",
                confirmPassword:"sgfsg",
			});
			res.json(response);
		} catch (err) {
			res.json(err);
		}
	}
}
