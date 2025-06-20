const errorMiddleware = (err, req, res, next) => {

    res.status(res.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};

export default errorMiddleware;