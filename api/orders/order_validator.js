const { check } = require('express-validator');

exports.createOrderValidation = [
    check('user_id', 'User id is required and should be numeric').isNumeric(),
    check('total', 'Total is required and should be numeric').isNumeric(),
    check('contact_number', 'Contact number is required and should be numeric').isNumeric(),
    check('address', 'Address is required').notEmpty(),
    check('address_owner', 'Address owner is required').notEmpty(),
    check('order_items', 'Order items is required and should be an array').isArray(),
];