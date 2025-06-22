import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/authInfo', authController.authInfo);
authRouter.post('/logout', authController.logout);

export default authRouter;