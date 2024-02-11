const pool = require("../../config/database");

module.exports = {
    //Returns promise for order service
    getOrderItemsDb: async id => {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT order_details.product_id, products.img_url, products.name, order_details.description FROM order_details 
            JOIN products ON order_details.product_id = products.id 
            WHERE order_details.order_id = ?`,
                [id],
                (error, results, fields) => {
                    if (error) {
                        resolve([]);
                    }
                    resolve(results);
                }
            );
        });
    },
    getOrderInfoByOrderIdDb: (id, callback) => {
        pool.query(`SELECT order_details.product_id, products.img_url, products.name, order_details.description FROM order_details 
            JOIN products ON order_details.product_id = products.id 
            WHERE order_details.order_id = ?`,
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