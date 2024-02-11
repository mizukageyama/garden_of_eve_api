const { validationResult } = require("express-validator");
const { getAllOrdersDb, getUserOrdersDb, createOrderDb, doneShippedOrderDb, cancelOrderDb, markOrderAsCompleteDb, getOrdersByStatusDb } = require("./order.service");

module.exports = {
    getAllOrders: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        };

        getAllOrdersDb(params, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserOrders: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            id: parseInt(req.query.id) || 0,
        };

        getUserOrdersDb(params, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getOrdersByStatus: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            status: req.query.status || 'To Ship'
        };
        getOrdersByStatusDb(params, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    createOrder: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        createOrderDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Order Added Successfully'
            });
        });
    },
    doneShippedOrder: (req, res) => {
        doneShippedOrderDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Order id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Order Shipped'
            });

        });

    },
    cancelOrder: (req, res) => {
        cancelOrderDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Order id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Order Cancelled'
            });

        });
    },
    markOrderAsComplete: (req, res) => {
        markOrderAsCompleteDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Order id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Order Completed'
            });

        });

    },
};