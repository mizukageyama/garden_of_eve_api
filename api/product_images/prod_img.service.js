const pool = require("../../config/database");

module.exports = {
    getProductImagesDb: async (prod_id) => {
        return new Promise(function (resolve, reject) {
            pool.query(`SELECT id, directory, photo_url FROM prod_images WHERE product_id = ?`,
                [prod_id],
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        resolve([]);
                    }
                    if (!results) {
                        resolve([]);
                    }

                    resolve(results);
                });
        });
    }
};