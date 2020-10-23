const jsonWebTokens = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

module.exports = {
    validateToken: (req, res, next) => {
        const jwt = req.get("Authorization").slice(7);
        if (jwt && jwt != null && jwt != undefined) {
            jsonWebTokens.verify(jwt, SECRET_KEY, (error, decoded) => {
                if (error) {
                    throw new Error("INVALID_TOKEN");
                } else {
                    next();
                }
            });
        } else {
            throw new Error("ACCESS_DENIED_UN_AUTHORIZED_USER");
        }
    }
}