import { Router } from "express";

const authRouter = Router();

authRouter.post('/login', (req, res, next) => {
    try {
        res.send('Login route');
    } catch (error) {
        return next(error);
    }
})

export default authRouter;