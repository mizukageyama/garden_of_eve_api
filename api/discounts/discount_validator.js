const { check } = require('express-validator');

exports.updateDiscountValidation = [
    check('name', 'Discount name is required').notEmpty(),
    check('description', 'Discount description is required').notEmpty(),
    check('discount_percent', 'Discount percent is required and should be numeric').isNumeric(),
    check('id', 'Discount id is required and should be numeric').isNumeric()
];

