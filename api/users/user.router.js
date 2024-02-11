const { getUsers, getUserById, updateUserInfo, deleteUser, changeProfileImage } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../middlewares/token_validation");
const upload = require("../../config/multer");
const { updateUserValidation } = require("./users_validator");

router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUserValidation, updateUserInfo);
router.patch('/change_profile', checkToken, upload.any(), changeProfileImage);
router.delete('/:id', checkToken, deleteUser);

module.exports = router;