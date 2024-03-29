import express from "express";
import AuthController from "../controllers/auth.controller.js";

const loginRouter = express.Router();
const authController = new AuthController();

loginRouter.post("/", authController.loginController);

export default loginRouter;
