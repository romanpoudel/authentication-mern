import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const refreshRouter = express.Router();
const authController = new AuthController();

refreshRouter.get('/',authController.refreshController);

export default refreshRouter;