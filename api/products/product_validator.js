const { check } = require('express-validator');

exports.addDiscountValidation = [
    check('discount_id', 'Discount id is required and should be numeric').isNumeric(),
    check('id', 'Product id is required and should be numeric').isNumeric()
];

exports.updateInfoValidation = [
    check('name', 'Product name is required').notEmpty(),
    check('description', 'Product description is required').notEmpty(),
    check('sunlight', 'Sunlight info is required').notEmpty(),
    check('watering', 'Watering info is required').notEmpty(),
    check('lifespan', 'Product lifespan is required').notEmpty(),
    check('size', 'Product size is required').notEmpty(),
    check('price', 'Product price is required and should be numeric').isNumeric(),
    check('qty', 'Product quantity is required and should be numeric').isNumeric(),
    check('id', 'Product id is required and should be numeric').isNumeric()
];

exports.updateQtyValidation = [
    check('qty', 'Product quantity is required and should be numeric').isNumeric(),
    check('id', 'Product id is required and should be numeric').isNumeric()
];

exports.createProductValidation = [
    check('product_data').custom(value => {
        const json_data = JSON.parse(value);

        const message = [];
        if (!json_data.name) {
            message.push('name');
        }
        if (!json_data.description) {
            message.push('description');
        }
        if (!json_data.watering) {
            message.push('watering');
        }
        if (!json_data.sunlight) {
            message.push('sunlight');
        }
        if (!json_data.lifespan) {
            message.push('lifespan');
        }
        if (!json_data.size) {
            message.push('size');
        }
        if (!json_data.qty) {
            message.push('qty');
        } else {
            if (isNaN(json_data.qty)) {
                message.push('qty (must be numeric)');
            }
        }
        if (!json_data.price) {
            message.push('price');
        } else {
            if (isNaN(json_data.price)) {
                message.push('price (must be numeric)');
            }
        }
        if (!json_data.img_credit) {
            message.push('img_credit');
        }

        if (message) {
            return true;
        }
        return Promise.reject(`Please provide the following data: ${message.join(", ")}`);
    }),
];

