const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({
                success: 0,
                message: "Access Denied! Unauthorized User"
            });
        }
    }
};