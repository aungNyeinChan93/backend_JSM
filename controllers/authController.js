import UserModel from "../models/UserModel.js";
import { Bcrypt, JWT } from "../utils/helper.js";
import { JWT_SECRET } from "../config/env.js";
import mongoose from "mongoose";

const authController = {
    register: async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { name, email, password } = req.body;
            const hashPassword = await Bcrypt.hash(password, 15);
            const registerUser = hashPassword && await UserModel.register(name, email, hashPassword);
            const registerToken = registerUser && JWT.jwt_sign({ _id: registerUser._id }, JWT_SECRET);
            session.commitTransaction();
            return registerToken && registerUser && res.status(201).json({
                success: true,
                message: 'Register successful',
                result: { ...registerUser, registerToken }
            })
        } catch (error) {
            await session.abortTransaction();
            return next(error);
        }
        finally {
            session.endSession();
        }
    },
    login: async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { email, password } = req.body;
            const loginUser = await UserModel.login(email, password);
            const loginToken = loginUser && JWT.jwt_sign({ _id: loginUser._id }, JWT_SECRET);
            await session.commitTransaction();
            return loginToken && loginUser && res.status(200).json({
                success: true,
                message: 'Login successful',
                result: { ...loginUser, loginToken }
            });
        } catch (error) {
            await session.abortTransaction();
            return next(error);
        }
        finally {
            session.endSession();
        }
    },
    authInfo: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization || !authorization.startsWith('Bearer')) {
                res.status(401);
                return next(new Error('Authorization token is required!'));
            }
            const token = authorization && authorization.split(' ')[1];
            if (!token) {
                res.status(401);
                return next(new Error('Authorization token is required!'));
            }
            const decoded = JWT.jwt_verify(token, JWT_SECRET);
            if (decoded instanceof Error) {
                res.status(401);
                return next(new Error('Invalid or expired token!'));
            }
            const userId = decoded && decoded._id;
            if (!userId) {
                res.status(401);
                return next(new Error(' User ID not found in token!'));
            }
            const user = await UserModel.findById(userId, { password: 0, __v: 0 }).lean();
            if (!user) {
                res.status(401);
                return next(new Error('User not found!'));
            }
            return res.status(200).json({
                success: true,
                message: 'User authenticated successfully',
                result: user
            });
        } catch (error) {
            return next(error);
        }
    }
}

export default authController;