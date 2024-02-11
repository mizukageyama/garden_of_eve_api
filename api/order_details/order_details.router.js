const { getOrderItems } = require("./order_details.controller");
const { checkToken } = require("../../middlewares/token_validation");
const router = require("express").Router();

router.get('/:id', checkToken, getOrderItems);

module.exports = router;