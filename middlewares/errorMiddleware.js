import chalk from 'chalk';

const errorMiddleware = (err, req, res, next) => {

    console.log(chalk.red(`Error: ${err.message}`));
    res.status(res.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};

export default errorMiddleware;