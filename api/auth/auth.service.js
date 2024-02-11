const pool = require("../../config/database");

module.exports = {
    getUserByEmailDb: (email, callBack) => {
        pool.query(`SELECT id, email, first_name, last_name, password, profile_img, is_admin,
        DATE_FORMAT(created_at, '%Y-%m-%d %T') as created_at, 
        DATE_FORMAT(modified_at, '%Y-%m-%d %T') as modified_at FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    createUserDb: (data, callBack) => {
        pool.query(`INSERT INTO users(email, password, first_name, last_name, is_admin) VALUES (?,?,?,?,?)`,
            [data.email, data.password, data.first_name, data.last_name, data.is_admin || 0],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatePasswordDb: (data, callBack) => {
        pool.query(`UPDATE users SET password = ? WHERE id = ?`,
            [data.new_password, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    }
};