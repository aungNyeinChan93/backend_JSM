import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";

const userController = {
    users: async (req, res, next) => {
        try {
            const users = await UserModel.find().select('name email').lean();
            if (!users || users.length === 0) {
                res.status(400);
                return next(new Error('No users found!'));
            }
            return users && res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                result: users,
            });
        } catch (error) {
            return next(error);
        }
    },
    user: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = id && await UserModel.findById(id).select('-password -__v').lean();

            if (user instanceof Error) {
                res.status(400);
                return next(new Error('User not found!'));
            }

            return user && res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                result: user,
            });

        } catch (error) {
            return next(error);
        }
    },
    create: async (req, res, next) => {
        res.json('create users')
    },
    modify: async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateUser = id && await UserModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
                .select('-password -__v').lean();
            updateUser && res.status(200).json({
                success: true,
                message: 'User updated successfully',
                result: updateUser,
            })
        } catch (error) {
            return next(error);
        }
    },
    drop: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { _id: deleteUserId } = id && await UserModel.findByIdAndDelete(id).lean();
            deleteUserId && res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                result: { deleteUserId }
            });
        } catch (error) {
            return next(error);
        }
    },
};

export default userController;