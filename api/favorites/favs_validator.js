const { check } = require('express-validator');

exports.addFavValidator = [
    check('user_id', 'User id is required and should be numeric').isNumeric(),
    check('product_id', 'Product id is required and should be numeric').isNumeric(),
];

