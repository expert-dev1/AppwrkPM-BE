const jsonWebTokens = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const User = require('../models/auth/Users');
const Employee = require('../models/employee/Employee');

module.exports = {
    validateToken: (req, res, next) => {
        const jwt = req.get("Authorization").slice(7);
        console.log('jwt : ', jwt);
        if (jwt && jwt != null && jwt != undefined) {
            jsonWebTokens.verify(jwt, SECRET_KEY, (error, decoded) => {
                console.log('Error inside validate token : ', error);
                if (error) {
                    var responseMap = {
                        statusCode: 401,
                        isSuccess: false,
                        message: "Token Expires or Invalid Token",
                    }
                    res.status(401);
                    res.send(JSON.stringify(responseMap));
                    throw new Error("INVALID_TOKEN");
                } else {
                    const decoded = jsonWebTokens.verify(jwt, SECRET_KEY);
                    if (decoded && decoded != undefined && decoded != null) {
                        const userDetails = decoded.result;
                        Employee.findByPk(userDetails.employeeId).then(data => {
                            if (!data.isDeleted) {
                                req.employee = data;
                                req.userId = userDetails.userId;
                                next();
                            } else {
                                var responseMap = {
                                    statusCode: 403,
                                    isSuccess: false,
                                    message: "Access Denied Unauthorized user.",
                                }
                                res.status(403);
                                res.send(JSON.stringify(responseMap));
                                throw new Error("ACCESS_DENIED_UN_AUTHORIZED_USER");
                            }
                        }).catch(error => {
                            console.log('Error inside getting valid employee : ', error);
                        });
                    } else {
                        var responseMap = {
                            statusCode: 403,
                            isSuccess: false,
                            message: "Access Denied Unauthorized user.",
                        }
                        res.status(403);
                        res.send(JSON.stringify(responseMap));
                        throw new Error("ACCESS_DENIED_UN_AUTHORIZED_USER");
                    }
                }
            });
        } else {
            var responseMap = {
                statusCode: 403,
                isSuccess: false,
                message: "Access Denied Unauthorized user.",
            }
            res.status(403);
            res.send(JSON.stringify(responseMap));
            throw new Error("ACCESS_DENIED_UN_AUTHORIZED_USER");
        }
    }
}