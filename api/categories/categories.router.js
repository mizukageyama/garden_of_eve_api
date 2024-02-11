const { getCategories, createCategory, updateCategory, deleteCategory } = require("./categories.controller");
const { checkToken } = require("../../middlewares/token_validation");
const { updateCategoryValidation, createCategoryValidation } = require("./categories_validator");
const router = require('express').Router();

router.get('/', getCategories);
router.post('/', checkToken, createCategoryValidation, createCategory);
router.patch('/', checkToken, updateCategoryValidation, updateCategory);
router.delete('/:id', checkToken, deleteCategory);

module.exports = router;