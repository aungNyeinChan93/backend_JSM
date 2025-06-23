import mongoose from "mongoose";
import SubscriptionModel from "../models/SubscriptionModel.js";

const subscriptionController = {
    subscribers: async (req, res, next) => {
        try {
            const { user_id } = req;
            if (user_id !== req.params.user_id) {
                const error = new Error('you can not authorize!');
                error.ststus = 401;
                return next(error)
            }
            const subscriptions = user_id && await SubscriptionModel.find({ userId: user_id });
            subscriptions && res.status(200).json({
                success: true,
                message: 'Get All user Subscription success',
                result: subscriptions
            })
        } catch (error) {
            return next(error)
        }
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
                .populate('userId', { password: 0 }).lean();
            subscription && res.status(201).json({
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