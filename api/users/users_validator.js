const { check } = require('express-validator');

exports.updateUserValidation = [
    check('first_name', 'New first name is required').notEmpty(),
    check('last_name', 'New last name is required').notEmpty(),
    check('id', 'User id is required and should be numeric and should be numeric').isNumeric()
];

