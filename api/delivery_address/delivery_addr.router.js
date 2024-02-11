const { getUserAddress, addNewAddress, updateAddress, deleteAddress } = require("./delivery_addr.controller");
const { checkToken } = require("../../middlewares/token_validation");
const { addAddrValidation, updateAddrValidation } = require("./addr_validator");
const router = require("express").Router();

router.get('/:id', checkToken, getUserAddress);
router.post('/', checkToken, addAddrValidation, addNewAddress);
router.patch('/', checkToken, updateAddrValidation, updateAddress);
router.delete('/:id', checkToken, deleteAddress);

module.exports = router;