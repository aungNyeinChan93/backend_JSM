import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

// userRouter.get('/', userController.users);
// userRouter.post('/', userController.create);
// userRouter.get('/:id', userController.user);
// userRouter.put('/:id', userController.modify);
// userRouter.delete('/:id', userController.drop);

userRouter.use(authMiddleware); // Apply auth middleware to all routes in this router

userRouter.route('/')
    .get(userController.users)
    .post(userController.create);

userRouter.route('/:id')
    .get(userController.user)
    .put(userController.modify)
    .delete(userController.drop);

export default userRouter;