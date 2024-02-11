const pool = require("../../config/database");

module.exports = {
    saveRefreshTokenDb: (data, callBack) => {
        pool.query(`INSERT INTO refresh_token(user_id, token, expiry_date) VALUES (?,?,?)`,
            [data.user_id, data.token, data.expiry_date],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    verifyRefreshTokenDb: (data, callBack) => {
        pool.query(`SELECT * FROM refresh_token WHERE user_id = ? AND token = ?`,
            [data.user_id, data.token],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },
    deleteRefreshTokenDb: (token, callback) => {
        pool.query(`DELETE FROM refresh_token WHERE token = ?`,
            [token],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteAllRefreshTokenByUserDb: (id, callback) => {
        pool.query(`DELETE FROM refresh_token WHERE user_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};