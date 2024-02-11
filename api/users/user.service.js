const pool = require("../../config/database");
const { user_query } = require("../../config/const_query");

module.exports = {
    getUsersDb: (params, callBack) => {
        const offset = (params.page - 1) * params.limit;

        let filter = "";
        if (params.searchKey) {
            filter = `WHERE users.first_name LIKE '%${params.searchKey}%' OR users.last_name LIKE '%${params.searchKey}%'`;
        }
        const u_query = `SELECT ${user_query} FROM users ${filter} ORDER BY users.last_name ASC`;

        pool.query(`SELECT COUNT(users.first_name) as row_length FROM users ${filter}`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                var totalUsers = results[0].row_length;
                if (totalUsers === 0) {
                    return callBack(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_users: 0,
                        has_prev: false,
                        has_next: false,
                        users: []
                    });
                }
                var totalPages = Math.ceil(totalUsers / params.limit);

                if (params.page > totalPages) {
                    return callBack(null, results);
                }

                pool.query(`${u_query} LIMIT ${offset},${params.limit}`,
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error);
                        }

                        let users = {
                            current_page: params.page,
                            total_pages: totalPages,
                            total_users: totalUsers,
                            has_prev: offset > 0,
                            has_next: params.page < totalPages,
                            users: results
                        }
                        return callBack(null, users);
                    });
            });
    },
    getUserByIdDb: (id, callBack) => {
        pool.query(`SELECT ${user_query} FROM users WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            });
    },
    updateUserInfoDb: (data, callBack) => {
        pool.query(`UPDATE users SET first_name = ?, last_name = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.first_name, data.last_name, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    changeProfileImageDb: (id, image, callBack) => {
        pool.query(`UPDATE users SET profile_img = ? WHERE id = ?`,
            [image.url, id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    deleteUserDb: (id, callBack) => {
        pool.query(`DELETE FROM users WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
};