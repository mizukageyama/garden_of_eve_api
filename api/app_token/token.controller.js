const { sign } = require("jsonwebtoken");
const { verifyRefreshTokenDb, deleteRefreshTokenDb, deleteAllRefreshTokenByUserDb } = require("./token.service");

module.exports = {
    createNewAccessToken: (req, res) => {
        const body = req.body;

        verifyRefreshTokenDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!results) {
                return res.status(401).json({
                    success: 0,
                    message: `Refresh token does not exist`
                });
            } else {
                let expiry_date = new Date(results.expiry_date);
                let date_now = new Date();
                if (expiry_date > date_now) {
                    const jsonToken = sign({ result: results }, process.env.TOKEN_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        success: 1,
                        message: "Access Token Generated",
                        token: jsonToken
                    });
                }
                else {
                    deleteRefreshTokenDb(body.token, (err, results) => { });
                    return res.status(401).json({
                        success: 0,
                        message: 'Refresh Token Expired'
                    });
                }
            }
        });
    },
    deleteRefreshToken: (req, res) => {
        deleteRefreshTokenDb(req.params.token, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Token does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Token Deleted'
            });
        });
    },

    deleteUsersRefreshTokens: (req, res) => {
        deleteAllRefreshTokenByUserDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Token does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Refresh Tokens Deleted'
            });
        });
    },
};