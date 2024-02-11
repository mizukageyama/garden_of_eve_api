const { check } = require('express-validator');

exports.createCategoryValidation = [
    check('name', 'Category name is required').notEmpty()
];

exports.updateCategoryValidation = [
    check('id', 'Category id is required and should be numeric').isNumeric(),
    check('name', 'Category name is required').notEmpty()
];

