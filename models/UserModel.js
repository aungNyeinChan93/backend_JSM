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

// model
const UserModel = model('User', UserSchema, 'users');

export default UserModel;
