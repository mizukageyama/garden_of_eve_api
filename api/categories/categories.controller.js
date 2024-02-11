const { validationResult } = require("express-validator");
const { getCategoriesDb, createCategoryDb, updateCategoryDb, deleteCategoryDb } = require("./categories.service");

module.exports = {
    getCategories: (req, res) => {
        getCategoriesDb((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: 'No Categories'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    createCategory: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        createCategoryDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(201).json({
                success: 1,
                message: "New Category Added"
            });
        });
    },
    updateCategory: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateCategoryDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(201).json({
                success: 1,
                message: "Category Updated"
            });
        });
    },
    deleteCategory: (req, res) => {
        deleteCategoryDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(200).json({
                success: 1,
                message: "Category Deleted"
            });
        });
    }
};