import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from './config/env.js';

const connectDB = async (cb) => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined. Please set it in your environment variables in .env<development/production>.local file.");
        }
        const db = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${db.connection.host} on ${NODE_ENV} server`) // Log the host of the connected database
        cb();
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;