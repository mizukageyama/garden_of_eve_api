const { product_query_join, discount_query_join } = require("../../config/const_query");
const pool = require("../../config/database");
const { productJson } = require("../../config/data_json");

module.exports = {
    getUsersFavoritesDb: (params, callback) => {
        const offset = (params.page - 1) * params.limit;

        pool.query(`SELECT COUNT(favorites.user_id) as row_length FROM favorites WHERE favorites.user_id = ?`,
            [params.id], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }

                var favProducts = results[0].row_length;
                if (favProducts === 0) {
                    return callback(null, {
                        current_page: 0,
                        total_pages: 0,
                        total_favorites: 0,
                        has_prev: false,
                        has_next: false,
                        favorites: []
                    });
                }
                var totalPages = Math.ceil(favProducts / params.limit);

                if (params.page > totalPages) {
                    return callback(null, results);
                }

                pool.query(`SELECT favorites.id as fav_id, ${product_query_join}, ${discount_query_join} FROM favorites
                LEFT JOIN products ON products.id = favorites.product_id 
                LEFT JOIN discount ON products.discount_id = discount.id
                WHERE favorites.user_id = ? LIMIT ${offset}, ${params.limit}`,
                    [params.id],
                    async (error, results, fields) => {
                        if (error) {
                            return callback(error);
                        }

                        let fav_products = [];
                        for (let data of results) {
                            let mapProduct = await productJson(data);
                            mapProduct["fav_id"] = data.fav_id;
                            fav_products.push(mapProduct);
                        }

                        let favorites_results = {
                            current_page: params.page,
                            total_pages: totalPages,
                            total_favorites: favProducts,
                            has_prev: offset > 0,
                            has_next: params.page < totalPages,
                            favorites: fav_products
                        }

                        return callback(null, favorites_results);
                    });
            });
    },
    addToFavoritesDb: (data, callback) => {
        pool.query(`INSERT INTO favorites (user_id, product_id) VALUES (?, ?)`,
            [data.user_id, data.product_id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteFavoriteById: (id, callback) => {
        pool.query(`DELETE FROM favorites WHERE id = ?`,
            id,
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
};