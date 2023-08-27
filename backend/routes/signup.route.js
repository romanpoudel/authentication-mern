import express from "express";
import AuthController from "../controllers/auth.controller.js";

const signupRouter = express.Router();
const authController = new AuthController();

signupRouter.post("/", authController.registerUser);

export default signupRouter;
