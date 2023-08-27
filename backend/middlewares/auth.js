import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
	//grab token from cookies
	const { token } = req.cookies;
	//if no token, stop there
	if (!token) {
		return res.status(401).send("Unauthorized");
	}
	//decode the token and get id
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);
        req.user=decoded;
	} catch (err) {
		console.log(err);
        res.status(401).send("Invalid token");
	}

	//query to DB for that user id

	return next();
};

export default auth;
