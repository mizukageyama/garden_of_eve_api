const { createNewAccessToken, deleteUsersRefreshTokens, deleteRefreshToken } = require("./token.controller");

const router = require("express").Router();

router.post('/', createNewAccessToken);
router.delete('/:token', deleteRefreshToken);
router.delete('/all/:id', deleteUsersRefreshTokens);

module.exports = router;