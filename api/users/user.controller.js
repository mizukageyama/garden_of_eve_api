const { validationResult } = require("express-validator");
const { uploadProfileImage } = require("../product_images/prod_img.controller");
const { getUsersDb, getUserByIdDb, deleteUserDb, updateUserInfoDb, changeProfileImageDb } = require("./user.service");

module.exports = {
    getUsers: (req, res) => {
        const params = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            searchKey: req.query.search_key || "",
        };

        getUsersDb(params, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            results.users.map((item) => item.password = undefined);
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        getUserByIdDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: 'User id does not exist'
                });
            }
            results.password = undefined;
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateUserInfo: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateUserInfoDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'User id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: "Updated Successfully"
            });
        });
    },
    changeProfileImage: async (req, res) => {
        const id = JSON.parse(req.body.id);
        let profile_image = await uploadProfileImage(req.files);

        if (!profile_image) {
            return res.status(500).json({
                success: 0,
                message: 'Unable to Upload Image',
            });
        }

        changeProfileImageDb(id, profile_image, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            return res.status(200).json({
                success: 1,
                message: 'Profile Changed Successfully'
            });
        });
    },
    deleteUser: (req, res) => {
        deleteUserDb(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'User id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User Deleted Successfully"
            });
        });
    }
};