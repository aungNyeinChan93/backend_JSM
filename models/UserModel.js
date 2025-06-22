import mongoose, { Schema, model } from "mongoose";
import { Bcrypt } from "../utils/helper.js";

const UserSchema = new Schema({
    name: { type: Schema.Types.String, trim: true, required: [true, 'name is required!'], min: [2, 'Name must be at least 3 characters long'], max: [50, 'Name cannot exceed 50 characters'] },
    email: { type: Schema.Types.String, unique: true, required: [true, 'email is required!'], lowercase: true },
    password: { type: Schema.Types.String, required: [true, 'password is required!'] },
}, {
    timestamps: true,
});

// static methods
UserSchema.statics.test = async function (name) {
    console.log(`Testing User model with name: ${name}`);
}

// register hooks
UserSchema.statics.register = async function (name, email, password) {
    try {
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required!');
        }
        const exisit = await this.findOne({ email });
        if (exisit) {
            throw new Error('User already exists with this email!');
        }
        const userDoc = await this.create({ name, email, password });
        const user = await this.findById(userDoc._id, { password: 0, __v: 0 }).lean();
        return user;
    } catch (error) {
        throw error || new Error('Something went wrong while registering the user!');
    }
}

// login hooks
UserSchema.statics.login = async function (email, password) {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required!');
        }
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error('User not found with this email!');
        }
        const matchPassword = user && await Bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error('Invalid password!');
        }
        const userData = user && matchPassword && await this.findById(user._id, { password: 0, __v: 0 }).lean();
        return userData;
    } catch (error) {
        throw error || new Error('Something went wrong while logging in the user!');
    }

}

// model
const UserModel = model('User', UserSchema, 'users');

export default UserModel;
