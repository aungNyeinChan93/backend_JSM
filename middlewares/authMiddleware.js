import { JWT } from '../utils/helper.js';
import { JWT_SECRET } from '../config/env.js';

const authMiddleware = async (req, res, next) => {
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
        const decoded = token && JWT.jwt_verify(token, JWT_SECRET);
        if (decoded instanceof Error) {
            res.status(401);
            return next(new Error('Invalid or expired token!'));
        }
        req.user_id = decoded && decoded._id;
        next();
    } catch (error) {
        return next(error);
    }
}

export default authMiddleware;