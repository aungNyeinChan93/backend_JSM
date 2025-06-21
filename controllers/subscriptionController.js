const subscriptionController = {
    subscribers: async (req, res, next) => {
        res.json('get all subscribers')
    },
    create: async (req, res, next) => {
        res.json('create subscribers')
    },
    subscriber: async (req, res, next) => {
        res.json('get subscriber')
    },
    modify: async (req, res, next) => {
        res.json('update subscriber')
    },
    drop: async (req, res, next) => {
        res.json('delete subscriber')
    },
};

export default subscriptionController;