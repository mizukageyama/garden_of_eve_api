const { discount_query } = require("../../config/const_query");
const pool = require("../../config/database");

module.exports = {
    getAllDiscountsDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;
        const d_query = `SELECT ${discount_query} FROM discount ORDER BY discount.created_at DESC`;

        pool.query(`SELECT COUNT(discount.name) as row_length FROM discount`,
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var totalDicounts = results[0].row_length;
                if (totalDicounts === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_discount: 0,
                        has_prev: false,
                        has_next: false,
                        discounts: []
                    });
                }
                var totalPages = Math.ceil(totalDicounts / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`${d_query} LIMIT ${offset},${params.limit}`,
                    (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        let discounts_results = {
                            current_page: params.page,
                            total_pages: totalPages,
                            total_discount: totalDicounts,
                            has_prev: offset > 0,
                            has_next: params.page < totalPages,
                            discounts: results
                        }
                        return callback(null, discounts_results);
                    });
            });
    },
    createDiscountDb: (data, callback) => {
        pool.query(`INSERT INTO discount(name, description, discount_percent) VALUES (?, ?, ?)`,
            [data.name, data.description, data.discount_percent],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            });
    },
    updateDiscountDb: (data, callback) => {
        pool.query(`UPDATE discount SET name = ?, description = ?, discount_percent = ?,
         modified_at = DEFAULT WHERE id = ?`,
            [data.name, data.description, data.discount_percent, data.id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            });
    },
    deleteDiscountDb: (id, callback) => {
        pool.query(`DELETE FROM discount WHERE id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            });
    },

};