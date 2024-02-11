const pool = require("../../config/database");
const { product_query_join, discount_query_join } = require("../../config/const_query");
const { productJson } = require("../../config/data_json");

module.exports = {
    createProductDb: (data, img, callback) => {
        pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.rollback(function () {
                        connection.release();
                    });
                    return callback(error);
                }

                connection.query(`INSERT INTO products(name, description, sunlight, watering, lifespan, 
                    size, qty, price, discount_id, img_directory, img_url, img_credit) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [data.name, data.description, data.sunlight, data.watering, data.lifespan, data.size,
                    data.qty, data.price, data.discount_id, img.directory, img.url, data.img_credit],
                    (error, results, fields) => {
                        if (error) {
                            connection.rollback(function () {
                                connection.release();
                            });
                            return callback(error);
                        }

                        const product_id = results.insertId;
                        let categories = data.categories.map((cat_id) => [product_id, cat_id]);
                        connection.query(`INSERT INTO prod_category (product_id, category_id) VALUES ?`, [categories], (error, results, fields) => {
                            if (error) {
                                connection.rollback(function () {
                                    connection.release();
                                });
                                return callback(error);
                            }
                        });

                        connection.commit(function (err) {
                            if (err) {
                                connection.rollback(function () {
                                    connection.release();
                                });
                            }
                            return callback(null, results);
                        });
                    });
            });
        });
    },
    getProductsDb: (params, callBack) => {
        const offset = (params.page - 1) * params.limit;

        let filter = "";
        if (params.searchKey) {
            filter = `WHERE products.name LIKE '%${params.searchKey}%'`;
        }

        const p_query = `SELECT ${product_query_join}, ${discount_query_join} FROM products 
        LEFT JOIN discount ON products.discount_id = discount.id ${filter}
        ORDER BY ${params.sortBy} ${params.sortOder}`;

        pool.query(`SELECT COUNT(products.name) as row_length FROM products ${filter}`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                var totalProducts = results[0].row_length;
                if (totalProducts === 0) {
                    return callBack(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_products: 0,
                        has_prev: false,
                        has_next: false,
                        products: []
                    });
                }
                var totalPages = Math.ceil(totalProducts / params.limit);

                if (params.page > totalPages) {
                    return callBack(null, results);
                }

                pool.query(`${p_query} LIMIT ${offset},${params.limit}`, async (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    let r_products = [];
                    for (let data of results) {
                        r_products.push(await productJson(data));
                    }

                    let product_results = {
                        current_page: params.page,
                        total_pages: totalPages,
                        total_products: totalProducts,
                        has_prev: offset > 0,
                        has_next: params.page < totalPages,
                        products: r_products
                    }

                    return callBack(null, product_results);
                });
            });
    },
    getProductsDbByCategoryDb: (params, callBack) => {
        const offset = (params.page - 1) * params.limit;

        let filter = "";
        if (params.categoryKey) {
            filter = `WHERE categories.name = '${params.categoryKey}'`;
        }

        const pc_query = `SELECT ${product_query_join}, ${discount_query_join} FROM prod_category
        LEFT JOIN categories ON categories.id = prod_category.category_id 
        JOIN products ON products.id = prod_category.product_id  
        LEFT JOIN discount ON products.discount_id = discount.id ${filter}
        ORDER BY ${params.sortBy} ${params.sortOder}`;

        pool.query(`SELECT COUNT(products.name) as row_length FROM prod_category
            LEFT JOIN categories ON categories.id = prod_category.category_id 
            JOIN products ON products.id = prod_category.product_id ${filter}`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                var totalProducts = results[0].row_length;
                if (totalProducts === 0) {
                    return callBack(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_products: 0,
                        has_prev: false,
                        has_next: false,
                        products: []
                    });
                }
                var totalPages = Math.ceil(totalProducts / params.limit);

                if (params.page > totalPages) {
                    return callBack(null, results);
                }

                pool.query(`${pc_query} LIMIT ${offset},${params.limit}`, async (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    let r_products = [];
                    for (let data of results) {
                        r_products.push(await productJson(data));
                    }

                    let product_results = {
                        current_page: params.page,
                        total_pages: totalPages,
                        total_products: totalProducts,
                        has_prev: offset > 0,
                        has_next: params.page < totalPages,
                        products: r_products
                    }

                    return callBack(null, product_results);
                });
            });
    },
    getProductByIdDb: (id, callBack) => {
        pool.query(`SELECT ${product_query_join}, ${discount_query_join} FROM products 
        LEFT JOIN discount ON products.discount_id = discount.id WHERE products.id = ?`,
            [id],
            async (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                if (!results[0]) {
                    return callBack(null, null);
                }

                const product = await productJson(results[0]);
                return callBack(null, product);
            });
    },
    updateProductDb: (data, callBack) => {
        pool.query(`UPDATE products SET name = ?, description = ?, sunlight = ?, watering = ?, 
        lifespan = ?, size = ?, price = ?, qty = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.name, data.description, data.sunlight, data.watering, data.lifespan,
            data.size, data.price, data.qty, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });

    },
    updateProductQtyDb: (data, callBack) => {
        pool.query(`UPDATE products SET qty = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.qty, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    addDiscountToProductDb: (data, callBack) => {
        pool.query(`UPDATE products SET discount_id = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.discount_id, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    deleteProductByIdDb: (id, callBack) => {
        pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.rollback(function () {
                        connection.release();
                    });
                    return callBack(error);
                }
                pool.query(`DELETE FROM products WHERE id = ?`, [id], (error, results, fields) => {
                    if (error) {
                        connection.rollback(function () {
                            connection.release();
                        });
                        return callBack(error);
                    }

                    pool.query(`DELETE FROM prod_category WHERE product_id = ?`, [id], (error, results, fields) => {
                        if (error) {
                            connection.rollback(function () {
                                connection.release();
                            });
                            return callBack(error);
                        }
                    });

                    connection.commit(function (err) {
                        if (err) {
                            connection.rollback(function () {
                                connection.release();
                            });
                        }
                        return callBack(null, results);
                    });
                });
            });
        });
    },
};
