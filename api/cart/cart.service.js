const pool = require("../../config/database");
const { product_query_join, cart_query_join, discount_query_join } = require("../../config/const_query");
const { cartItemJson } = require("../../config/data_json");

module.exports = {
    getCartItemsDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;

        c_query = `SELECT ${cart_query_join}, ${product_query_join}, ${discount_query_join}
        FROM shopping_cart JOIN products ON products.id = shopping_cart.product_id 
        LEFT JOIN discount ON products.discount_id = discount.id WHERE user_id = ?
        ORDER BY shopping_cart.created_at DESC`;

        pool.query(`SELECT COUNT(shopping_cart.user_id) as row_length FROM shopping_cart 
            JOIN products ON products.id = shopping_cart.product_id WHERE user_id = ?`,
            [params.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var totalCartItems = results[0].row_length;
                if (totalCartItems === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_cart_items: totalCartItems,
                        has_prev: false,
                        has_next: false,
                        cart_items: []
                    });
                }
                var totalPages = Math.ceil(totalCartItems / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`${c_query} LIMIT ${offset},${params.limit}`,
                    [params.id],
                    async (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }


                        let cartItems = [];
                        for (let data of results) {
                            cartItems.push(await cartItemJson(data));
                        }

                        let cart_results = {
                            current_page: params.page,
                            total_pages: totalPages,
                            total_cart_items: totalCartItems,
                            has_prev: offset > 0,
                            has_next: params.page < totalPages,
                            cart_items: cartItems
                        }

                        return callback(null, cart_results);
                    });
            });
    },
    addToCartDb: (data, callback) => {
        pool.query(`INSERT INTO shopping_cart (user_id, product_id, qty) VALUES (?,?,?)`,
            [data.user_id, data.product_id, data.qty],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateCartItemQtyDb: (data, callback) => {
        pool.query(`UPDATE shopping_cart SET qty = ?, modified_at = DEFAULT WHERE id = ?`,
            [data.qty, data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteCartItemDb: (id, callback) => {
        pool.query(`DELETE FROM shopping_cart WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }
};