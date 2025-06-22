import express from 'express';
import connectDB from './connectDB.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRouter from './routes/testRouter.js';
import loggerMiddleware from './middlewares/loggerMIddleware.js';
import { PORT, CookieSecret } from './config/env.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import subscriptionRouter from './routes/subscriptionRouter.js';
import cookieParser from 'cookie-parser';


const app = express();

// db connection
await connectDB(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
});

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParser(CookieSecret));





// routes
app.use('/api/v1/tests', testRouter)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)


// error handling middleware
app.use(errorMiddleware);

