import { aj } from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            decision.reason.isBot && next(new Error("Bot detected and blocked"));
            decision.reason.isRateLimit && next(new Error("Rate limit exceeded"));
            decision.reason.isShield && next(new Error("Request blocked by shield"));
            decision.reason.isBlocked && next(new Error("Request blocked by Arcjet"));
            return;
        }

        next();

    } catch (error) {
        return next(error);
    }
};

export default arcjetMiddleware;