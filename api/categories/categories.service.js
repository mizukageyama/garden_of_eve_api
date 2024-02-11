const pool = require("../../config/database");

module.exports = {
    getCategoriesDb: callback => {
        pool.query(`SELECT id, name, DATE_FORMAT(created_at, '%Y-%m-%d %T') as created_at, 
        DATE_FORMAT(modified_at, '%Y-%m-%d %T') as modified_at FROM categories`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    createCategoryDb: (data, callback) => {
        pool.query(`INSERT INTO categories (name) VALUES (?)`,
            [data.name],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateCategoryDb: (data, callback) => {
        pool.query(`UPDATE categories SET name = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.name, data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Category id does not exist'
                    });
                }
                return callback(null, results);
            }
        );
    },
    deleteCategoryDb: (id, callback) => {
        pool.query(`DELETE FROM categories WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        success: 0,
                        message: 'Category id does not exist'
                    });
                }
                return callback(null, results);
            }
        );
    },
    getProductCategoriesDb: async (prod_id) => {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT categories.name FROM categories
        INNER JOIN prod_category ON prod_category.category_id = categories.id
        WHERE prod_category.product_id = ?`,
                [prod_id],
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        resolve([]);
                    }
                    if (!results) {
                        resolve([]);
                    }
                    let categories = [];

                    for (let value of results) {
                        categories.push(value.name);
                    }
                    resolve(categories);
                });
        });
    },
}
