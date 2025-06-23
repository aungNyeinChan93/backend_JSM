import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";


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

// create cookies
testRouter.get('/cookies/create', (req, res, next) => {
    try {
        res.cookie('name', 'koko', { signed: true, expires: new Date(Date.now() + 900000), httpOnly: true });
        res.json({
            success: true,
            message: 'Cookie created successfully'
        })
    } catch (error) {
        return next(error);
    }
})

// read cookies
testRouter.get('/cookies/read', (req, res, next) => {
    try {
        const { name } = req.signedCookies;
        if (!name) {
            return res.status(404).json({
                success: false,
                message: 'Cookie not found'
            });
        }
        res.json({
            success: true,
            result: { name }
        });
    } catch (error) {
        return next(error);
    }
})

// destroy cookies
testRouter.get('/cookies/drop', (req, res, next) => {
    try {
        res.clearCookie('name');
        res.json({
            success: true,
            message: 'Cookie dropped successfully'
        });
    } catch (error) {
        return next(error);
    }
})

// check authentication
testRouter.get('/auth-check', authMiddleware, (req, res, next) => {
    const { user_id: _id } = req;
    _id && res.status(200).json({
        success: true,
        message: 'User is authenticated',
        result: { _id }
    });
})



export default testRouter;