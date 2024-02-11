const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { getUserByEmailDb, createUserDb, updatePasswordDb } = require("./auth.service");
const { getUserByIdDb } = require("../users/user.service");
const { sign } = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { saveRefreshTokenDb } = require("../app_token/token.service");

module.exports = {
    loginUser: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        getUserByEmailDb(body.email, (err, results) => {
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
                    message: `Email not Found in our Database`
                });
            }

            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                const refreshToken = sign({ result: results }, process.env.REFRESH_TOKEN_KEY, {
                    expiresIn: "7d"
                });

                let date = new Date();
                date.setDate(date.getDate() + 7);

                const refresh_data = {
                    user_id: results.id,
                    token: refreshToken,
                    expiry_date: date
                };
                saveRefreshTokenDb(refresh_data, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                });

                return res.status(200).json({
                    success: 1,
                    data: results,
                    message: "Login Success",
                    token: jsonToken,
                    refreshToken: refreshToken
                });
            } else {
                return res.status(401).json({
                    success: 0, message: "Invalid password"
                });
            }

        });
    },
    registerUser: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        getUserByEmailDb(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Connection Error'
                });
            }

            if (results) {
                return res.status(200).json({
                    success: 0,
                    message: `Email already exists`
                });
            }

            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            createUserDb(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: 'Database Connection Error'
                    });
                }
                results.password = undefined;
                return res.status(200).json({
                    success: 1,
                    message: 'Registered Successfully'
                });
            });
        });
    },
    updatePassword: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        getUserByIdDb(body.id, (err, results) => {
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
                    message: `User id does not exist`
                });
            }

            const result = compareSync(body.old_password, results.password);
            if (result) {
                const salt = genSaltSync(10);
                body.new_password = hashSync(body.new_password, salt);
                updatePasswordDb(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: 'Database Connection Error'
                        });
                    }
                    results.password = undefined;
                    return res.status(201).json({
                        success: 1,
                        message: "Password Changed Successfully"
                    });
                });
            } else {
                return res.status(401).json({
                    success: 0,
                    message: "Old Password is Incorrect"
                });
            }
        });
    }
};