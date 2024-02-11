const { validationResult } = require("express-validator");
const { getUserAddressDb, addNewAddressDb, updateAddressDb, deleteAddressDb } = require("./delivery_addr.service");

module.exports = {
    getUserAddress: (req, res) => {
        getUserAddressDb(req.params.id, (err, results) => {
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
    addNewAddress: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        addNewAddressDb(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'New Address Added'
            });
        });
    },
    updateAddress: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;
        updateAddressDb(body, (err, results) => {
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
                    message: 'Address id does not exist'
                });
            }
            return res.status(201).json({
                success: 1,
                message: 'Address Updated'
            });
        });
    },
    deleteAddress: (req, res) => {
        deleteAddressDb(req.params.id, (err, results) => {
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
                    message: 'Address id does not exist'
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Address Deleted'
            });
        });
    },
};