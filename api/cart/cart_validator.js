const { check } = require('express-validator');

exports.addToCartValidation = [
    check('user_id', 'User id is required and should be numeric').isNumeric(),
    check('product_id', 'Product id is required and should be numeric').isNumeric(),
    check('qty', 'Quantity is required and should be numeric').isNumeric()
];

exports.updateCartValidation = [
    check('id', 'Cart id is required and should be numeric').isNumeric(),
    check('qty', 'Quantity is required and should be numeric').isNumeric()
];

