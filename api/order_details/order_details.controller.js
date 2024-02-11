const { getOrderInfoByOrderIdDb } = require("./order_details.service");

module.exports = {
    getOrderItems: (req, res) => {
        getOrderInfoByOrderIdDb(req.params.id, (err, results) => {
            if (err) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database Error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    }
};