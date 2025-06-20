import express from 'express';
import { config } from 'dotenv';
import connectDB from './connectDB.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRouter from './routes/testRouter.js';
import loggerMiddleware from './middlewares/loggerMIddleware.js';


// dotenv configuration
config();

const app = express();
const PORT = process.env.PORT || 4000;

// db connection
connectDB(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
});

// Middlewares
app.use(express.json());
app.use(loggerMiddleware);


// routes
app.use('/api/v1/tests', testRouter)


// error handling middleware
app.use(errorMiddleware);
