import express from "express";
import AuthController from "../controllers/auth.controller.js";

const logoutRouter = express.Router();
const authController = new AuthController();

logoutRouter.get("/", authController.logoutController);

export default logoutRouter;