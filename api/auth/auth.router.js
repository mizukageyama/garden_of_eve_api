const { loginUser, registerUser, updatePassword } = require("./auth.controller");
const router = require("express").Router();
const { checkToken } = require("../../middlewares/token_validation");
const { loginValidation, signupValidation, updatepwValidation } = require("./auth_validator");

router.post('/login', loginValidation, loginUser);
router.post('/register', signupValidation, registerUser);
router.patch('/', checkToken, updatepwValidation, updatePassword);

module.exports = router;