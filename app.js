import express from 'express';
import { config } from 'dotenv';
import connectDB from './connectDB.js';
import errorMiddleware from './middlewares/errorMiddleware.js';


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


// routes
app.get('/tests', (req, res, next) => {
    try {
        res.status(403)
        throw new Error('This is a test error');
    } catch (error) {
        return next(error);
    }
})


// error handling middleware
app.use(errorMiddleware);
