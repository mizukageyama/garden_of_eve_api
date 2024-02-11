const { validationResult } = require("express-validator");
const { getCartItemsDb, addToCartDb, updateCartItemQtyDb, deleteCartItemDb } = require("./cart.service");

module.exports = {
    getCartItems: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            id: parseInt(req.query.id) || 0,
        };

        getCartItemsDb(params, async (err, results) => {
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
    addToCart: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        addToCartDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Item Added Successfully'
            });
        });
    },
    updateCartItemQty: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateCartItemQtyDb(body, (err, results) => {
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
                    message: 'Cart id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Item Updated Successfully'
            });
        });
    },
    deleteCartItem: (req, res) => {
        deleteCartItemDb(req.params.id, (err, results) => {
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
                    message: 'Cart id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product Removed from Cart'
            });
        });
    },

};