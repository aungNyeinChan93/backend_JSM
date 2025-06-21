import { Router } from "express";
import subscriptionController from "../controllers/subscriptionController.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', subscriptionController.subscribers);
subscriptionRouter.post('/', subscriptionController.create);
subscriptionRouter.get('/:id', subscriptionController.subscriber);
subscriptionRouter.post('/:id', subscriptionController.modify);
subscriptionRouter.post('/:id', subscriptionController.drop);

export default subscriptionRouter;

