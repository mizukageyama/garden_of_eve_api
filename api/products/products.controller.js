const { createProductDb, getProductsDb, getProductByIdDb, addDiscountToProductDb, getProductsDb2, getProductsDbByCategory, getProductsDbByCategoryDb } = require("./products.service");
const { updateProductDb, updateProductQtyDb, deleteProductByIdDb } = require("./products.service");
const { uploadProductImage } = require("../product_images/prod_img.controller");
const { validationResult } = require("express-validator");

module.exports = {
    createProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = JSON.parse(req.body.product_data);
        let product_image = await uploadProductImage(req.files);

        if (!product_image) {
            return res.status(500).json({
                success: 0,
                message: 'Unable to Upload Images',
            });
        }

        createProductDb(body, product_image, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(200).json({
                success: 1,
                message: 'Product Added Successfully'
            });
        });
    },
    getProducts: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            searchKey: req.query.search_key || "",
            sortBy: req.query.sort_by || "name", //name, price
            sortOder: req.query.sort_order || "ASC"
        };

        getProductsDb(params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getProductsByCategory: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            categoryKey: req.query.category_key || "",
            sortBy: req.query.sort_by || "name", //name, price
            sortOder: req.query.sort_order || "ASC"
        };
        getProductsDbByCategoryDb(params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getProductById: (req, res) => {
        getProductByIdDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: 'Product id does not exist'
                });

            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    addDiscountToProduct: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        addDiscountToProductDb(body, (err, results) => {
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
                    message: 'Product id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Discount Added Successfully'
            });
        });
    },
    updateProductInfo: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateProductDb(body, (err, results) => {
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
                    message: 'Product id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Product Updated Successfully'
            });
        });

    },
    updateProductQty: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateProductQtyDb(body, (err, results) => {
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
                    message: 'Product id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Quantity Updated Successfully'
            });
        });

    },
    //I think product should not be deleted 
    //because this will be used for other database (order, etc. even when 0 qty)
    deleteProductById: (req, res) => {
        deleteProductByIdDb(req.params.id, (err, results) => {
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
                    message: 'Product id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Product Deleted Successfully'
            });
        });
    },
};