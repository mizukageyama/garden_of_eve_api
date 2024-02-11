const { orders_query_join } = require("../../config/const_query");
const pool = require("../../config/database");
const { orderJson } = require("../../config/data_json");

module.exports = {
    getAllOrdersDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;

        const o_query = `SELECT ${orders_query_join} FROM orders 
        ORDER BY orders.created_at DESC`;

        pool.query(`SELECT COUNT(orders.id) as row_length FROM orders`,
            [params.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var totalOrders = results[0].row_length;
                if (totalOrders === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_orders: 0,
                        has_prev: false,
                        has_next: false,
                        orders: []
                    });
                }
                var totalPages = Math.ceil(totalOrders / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`${o_query} LIMIT ${offset},${params.limit}`, [params.id], async (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    let orders = [];
                    for (let data of results) {
                        orders.push(await orderJson(data));
                    }

                    let orders_results = {
                        current_page: params.page,
                        total_pages: totalPages,
                        total_orders: totalOrders,
                        has_prev: offset > 0,
                        has_next: params.page < totalPages,
                        orders: orders
                    }

                    return callback(null, orders_results);
                });
            });
    },
    getUserOrdersDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;

        const o_query = `SELECT ${orders_query_join} FROM orders 
        WHERE orders.user_id = ? 
        ORDER BY orders.created_at DESC`;

        pool.query(`SELECT COUNT(orders.user_id) as row_length FROM orders WHERE orders.user_id = ?`,
            [params.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var totalOrders = results[0].row_length;
                if (totalOrders === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_orders: 0,
                        has_prev: false,
                        has_next: false,
                        orders: []
                    });
                }
                var totalPages = Math.ceil(totalOrders / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`${o_query} LIMIT ${offset},${params.limit}`, [params.id], async (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    let orders = [];
                    for (let data of results) {
                        orders.push(await orderJson(data));
                    }

                    let orders_results = {
                        current_page: params.page,
                        total_pages: totalPages,
                        total_orders: totalOrders,
                        has_prev: offset > 0,
                        has_next: params.page < totalPages,
                        orders: orders
                    }

                    return callback(null, orders_results);
                });
            });
    },
    getOrdersByStatusDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;

        const o_query = `SELECT ${orders_query_join} FROM orders 
        WHERE orders.status = ? 
        ORDER BY orders.created_at DESC`;

        pool.query(`SELECT COUNT(orders.user_id) as row_length FROM orders WHERE orders.status = ?`,
            [params.status], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var totalOrders = results[0].row_length;
                if (totalOrders === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_orders: 0,
                        has_prev: false,
                        has_next: false,
                        orders: []
                    });
                }
                var totalPages = Math.ceil(totalOrders / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`${o_query} LIMIT ${offset},${params.limit}`, [params.status], async (error, results, fields) => {
                    if (error) {
                        return callback(error);
                    }

                    let orders = [];
                    for (let data of results) {
                        orders.push(await orderJson(data));
                    }

                    let orders_results = {
                        current_page: params.page,
                        total_pages: totalPages,
                        total_orders: totalOrders,
                        has_prev: offset > 0,
                        has_next: params.page < totalPages,
                        orders: orders
                    }

                    return callback(null, orders_results);
                });
            });
    },
    createOrderDb: (data, callback) => {
        pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.rollback(function () {
                        connection.release();
                    });
                    return callback(error);
                }

                connection.query(`INSERT INTO orders (user_id, total, status, address_owner, contact_number, address)
                VALUES (?, ?, 'To Ship', ?, ?, ?)`,
                    [data.user_id, data.total, data.address_owner, data.contact_number, data.address],
                    function (error, results, fields) {
                        if (error) {
                            connection.rollback(function () {
                                connection.release();
                            });
                            return callback(error);
                        }

                        let order_id = results.insertId;
                        let order_items = data.order_items.map((item) => [order_id, item.id, item.description]);

                        connection.query(`INSERT INTO order_details (order_id, product_id, description) 
                            VALUES ?`,
                            [order_items],
                            function (error, results, fields) {
                                if (err) {
                                    connection.rollback(function () {
                                        connection.release();
                                    });
                                    return callback(error);
                                }

                                let cart_items = data.order_items.map((item) => [item.cart_id]);

                                connection.query(`DELETE FROM shopping_cart WHERE id IN (${cart_items.join(',')})`,
                                    [],
                                    function (error, results, fields) {
                                        if (err) {
                                            connection.rollback(function () {
                                                connection.release();
                                            });
                                            return callback(error);
                                        }
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
            });
        });
    },
    doneShippedOrderDb: (id, callback) => {
        pool.query(`UPDATE orders SET status = 'To Receive' WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    cancelOrderDb: (id, callback) => {
        pool.query(`UPDATE orders SET status = 'Cancelled' WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    markOrderAsCompleteDb: (id, callback) => {
        pool.query(`UPDATE orders SET status = 'Completed' WHERE id = ?`,
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