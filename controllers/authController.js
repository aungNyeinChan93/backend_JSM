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
            registerToken && res.status(201).json({
                success: true,
                message: 'Register successful',
                result: { ...registerUser, registerToken }
            })
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            return next(error);
        }
        finally {
            session.endSession();
        }
    }
}

export default authController;