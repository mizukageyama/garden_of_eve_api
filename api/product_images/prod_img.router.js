const router = require("express").Router();
const upload = require('../../config/multer');
const { uploadProductImage, uploadProfileImage } = require("./prod_img.controller");

//router.post('/', upload.array('image'), uploadProductImages);
router.post('/', upload.any(), uploadProductImage);
router.post('/profile', upload.any(), uploadProfileImage);

module.exports = router;