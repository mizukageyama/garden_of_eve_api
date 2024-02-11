const { getUsersFavorites, addToFavorites, deleteFavorite } = require("./favorites.controller");
const { addFavValidator } = require("./favs_validator");
const { checkToken } = require("../../middlewares/token_validation");

const router = require("express").Router();

router.get('/', checkToken, getUsersFavorites);
router.post('/', checkToken, addFavValidator, addToFavorites);
router.delete('/:id', checkToken, deleteFavorite);

module.exports = router;