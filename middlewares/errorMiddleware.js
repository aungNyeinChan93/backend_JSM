// import chalk from 'chalk';

// const errorMiddleware = (err, req, res, next) => {

//     console.log(chalk.red(`Error: ${err.message}`));
//     res.status(res.statusCode ? res.statusCode : res.statusCode = 500).json({
//         success: false,
//         error: err.message || 'Internal Server Error',
//     });
// };

// export default errorMiddleware;


const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    if (err) {
        res.status(statusCode || 500).json({
            error: err.message
        })
    }
}

export default errorMiddleware;