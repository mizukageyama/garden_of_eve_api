const { createDiscount, getDiscounts, updateDiscount, deleteDiscount } = require("./discounts.controller");
const { checkToken } = require("../../middlewares/token_validation");
const { updateDiscountValidation } = require("./discount_validator");
const router = require("express").Router();

router.get('/', checkToken, getDiscounts);
router.post('/', checkToken, createDiscount);
router.patch('/', checkToken, updateDiscountValidation, updateDiscount);
router.delete('/:id', checkToken, deleteDiscount);

module.exports = router;