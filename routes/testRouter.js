import { Router } from "express";


const testRouter = Router();

// Test errormiddleware
testRouter.get('/errormiddleware', (req, res, next) => {
    try {
        res.status(403);
        throw new Error('This is a test error');
    } catch (error) {
        return next(error);
    }
});



export default testRouter;