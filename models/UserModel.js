import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: Schema.Types.String, trim: true, required: [true, '  is required!'], min: [2, 'Name must be at least 3 characters long'], max: [50, 'Name cannot exceed 50 characters'] },
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
}

// model
const UserModel = model('User', UserSchema, 'users');

export default UserModel;
