
const { addToFavoritesDb, getUsersFavoritesDb, deleteFavoriteById } = require("./favorites.service");
const { validationResult } = require("express-validator");

module.exports = {
    getUsersFavorites: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            id: parseInt(req.query.id) || 0,
        };

        getUsersFavoritesDb(params, async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    addToFavorites: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        addToFavoritesDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Added to Favorites Successfully'
            });
        });
    },
    deleteFavorite: (req, res) => {
        deleteFavoriteById(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Favorite id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Deleted Successfully'
            });
        });
    },
};