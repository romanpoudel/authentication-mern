import express from "express";
import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await authModel.findOne({
            $or: [
                { email: emailOrUsername },
                { userName: emailOrUsername }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Password matches, authentication successful
        res.status(200).json({ message: "Authentication successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default loginRouter;
