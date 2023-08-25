import authModel from "../models/auth.model.js";

export default class AuthController {
	async registerUser(req, res) {
        const { email, userName,password,confirmPassword } = req.body;
		try {
			const response = await authModel.create({
				email,
				userName,
                password,
                confirmPassword,
			});
			res.status(200).json(response);
		} catch (err) {
			res.status(400).json(err);
		}
	}
}
