const pool = require("../../config/database");

module.exports = {
    getUserAddressDb: (id, callback) => {
        pool.query(`SELECT * FROM delivery_address WHERE user_id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    addNewAddressDb: (data, callback) => {
        pool.query(`INSERT INTO delivery_address (user_id, address, full_name, contact_number) 
        VALUES (?, ?, ?, ?)`,
            [data.user_id, data.address, data.full_name, data.contact_number],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateAddressDb: (data, callback) => {
        pool.query(`UPDATE delivery_address SET address = ?, full_name = ?, contact_number = ? 
        WHERE id = ?`,
            [data.address, data.full_name, data.contact_number, data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteAddressDb: (id, callback) => {
        pool.query(`DELETE FROM delivery_address WHERE id = ?`,
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