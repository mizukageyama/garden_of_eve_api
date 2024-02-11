const { getAllOrders, getUserOrders, createOrder, doneShippedOrder, cancelOrder, markOrderAsComplete, getOrdersByStatus } = require("./order.controller");
const { checkToken } = require("../../middlewares/token_validation");
const { createOrderValidation } = require("./order_validator");
const router = require("express").Router();

router.get('/all', checkToken, getAllOrders);
router.get('/', checkToken, getUserOrders);
router.post('/', checkToken, createOrderValidation, createOrder);
router.get('/by-status', getOrdersByStatus);
router.patch('/shipped/:id', checkToken, doneShippedOrder);
router.patch('/cancel/:id', checkToken, cancelOrder);
router.patch('/complete/:id', checkToken, markOrderAsComplete);

module.exports = router;