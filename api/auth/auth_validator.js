const { check } = require('express-validator');

exports.signupValidation = [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

exports.updatepwValidation = [
    check('id', 'User id is required and should be numeric').isNumeric(),
    check('old_password', 'Old password is required').notEmpty(),
    check('new_password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

