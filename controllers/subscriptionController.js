import mongoose from "mongoose";
import SubscriptionModel from "../models/SubscriptionModel.js";

const subscriptionController = {
    subscribers: async (req, res, next) => {
        res.json('get all subscribers')
    },
    create: async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { user_id } = req;
            if (!user_id) {
                const error = new Error('you are not authorized to create a subscription');
                error.status = 401;
                return next(error);
            }
            const subscriptionDoc = user_id && (await SubscriptionModel.create({ ...req.body, userId: user_id }));
            const subscription = subscriptionDoc && await SubscriptionModel.findById(subscriptionDoc._id)
                .populate('userId').lean();
            subscription && res.status(200).json({
                success: true,
                message: 'Subscription created successfully',
                result: subscription,
            })
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            return next(error);
        } finally {
            await session.endSession()
        }
    },
    subscriber: async (req, res, next) => {
        res.json('get subscriber')
    },
    modify: async (req, res, next) => {
        res.json('update subscriber')
    },
    drop: async (req, res, next) => {
        res.json('delete subscriber')
    },
};

export default subscriptionController;