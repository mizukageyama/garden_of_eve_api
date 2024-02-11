const { validationResult } = require("express-validator");
const { createDiscountDb, deleteDiscountDb, updateDiscountDb, getAllDiscountsDb } = require("./discounts.service");

module.exports = {
    getDiscounts: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        };

        getAllDiscountsDb(params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    createDiscount: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        createDiscountDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Discount Added Successfully'
            });
        });
    },
    updateDiscount: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateDiscountDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Discount id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Discount Updated Successfully'
            });
        });
    },
    deleteDiscount: (req, res) => {
        deleteDiscountDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Discount id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Discount Deleted Successfully'
            });
        });
    },
}