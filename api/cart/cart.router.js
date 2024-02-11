const { getCartItems, addToCart, updateCartItemQty, deleteCartItem } = require("./cart.controller");
const router = require("express").Router();
const { checkToken } = require("../../middlewares/token_validation");
const { updateCartValidation, addToCartValidation } = require("./cart_validator");

router.get('/', checkToken, getCartItems);
router.post('/', checkToken, addToCartValidation, addToCart);
router.patch('/', checkToken, updateCartValidation, updateCartItemQty);
router.delete('/:id', checkToken, deleteCartItem);

module.exports = router;