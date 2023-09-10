import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
	//for google auth
	if (req.user) {
		return next();
	}

	//grab token from cookies
	const { refreshToken } = req.cookies;
	const { accessToken } = req.headers;
	
	//if no token, stop there
	if (!accessToken && !refreshToken) {
		return res.status(401).send("Access Denied. No token provided.");
	}

	try {
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		if (!refreshToken) {
			return res
				.status(401)
				.send("Access Denied. No refresh token provided.");
		}

		try {
			const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
			const accessToken = jwt.sign({ user: decoded.id }, process.env.JWT_SECRET, {
				expiresIn: "15s",
			});

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "strict",
			})
				.header("accessToken", accessToken)
				.send(decoded.id);
		} catch (error) {
			return res.status(400).send("Invalid Token.");
		}
	}
};

export default auth;
