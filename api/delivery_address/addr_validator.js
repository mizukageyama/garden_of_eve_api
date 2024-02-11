const { check } = require('express-validator');

exports.addAddrValidation = [
    check('user_id', 'User id is required and should be numeric').isNumeric(),
    check('address', 'Address is required').notEmpty(),
    check('full_name', 'Full name is required').notEmpty(),
    check('contact_number', 'Contact number is required').notEmpty()
];

exports.updateAddrValidation = [
    check('address', 'Address is required').notEmpty(),
    check('full_name', 'Full name is required').notEmpty(),
    check('contact_number', 'Contact number is required').notEmpty(),
    check('id', 'Address id is required and should be numeric').isNumeric(),
];

