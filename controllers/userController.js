import UserModel from "../models/UserModel.js";

const userController = {
    users: async (req, res, next) => {

        await UserModel.test('aung')
        res.json('get all users')
    },
    create: async (req, res, next) => {
        res.json('create users')
    },
    user: async (req, res, next) => {
        res.json('get user')
    },
    modify: async (req, res, next) => {
        res.json('update user')
    },
    drop: async (req, res, next) => {
        res.json('delete user')
    },
};

export default userController;