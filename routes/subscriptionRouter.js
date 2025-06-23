import { Router } from "express";
import subscriptionController from "../controllers/subscriptionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', subscriptionController.subscribers);
subscriptionRouter.post('/', authMiddleware, subscriptionController.create);
subscriptionRouter.get('/:id', subscriptionController.subscriber);
subscriptionRouter.post('/:id', subscriptionController.modify);
subscriptionRouter.post('/:id', subscriptionController.drop);

export default subscriptionRouter;

