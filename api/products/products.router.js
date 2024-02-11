const { getProducts, getProductById, updateProductInfo, addDiscountToProduct, getProductsByCategory } = require("./products.controller");
const { updateProductQty, deleteProductById, createProduct } = require("./products.controller");
const router = require("express").Router();
const { checkToken } = require("../../middlewares/token_validation");
const upload = require("../../config/multer");
const { createProductValidation, updateInfoValidation, updateQtyValidation, addDiscountValidation } = require("./product_validator");

router.post('/', checkToken, upload.any(), createProductValidation, createProduct);
router.get('/', getProducts);
router.get('/by_category', getProductsByCategory);
router.get('/:id', getProductById);
router.patch('/', checkToken, updateInfoValidation, updateProductInfo);
router.patch('/qty', checkToken, updateQtyValidation, updateProductQty);
router.patch('/add_discount', checkToken, addDiscountValidation, addDiscountToProduct);
router.delete('/:id', checkToken, deleteProductById);

module.exports = router;