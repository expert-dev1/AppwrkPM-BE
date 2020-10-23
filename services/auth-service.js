const bcrypt = require("bcrypt");
const CommonUtils = require("../common-utils/CommonUtils");
const Users = require("../models/auth/Users");
const UserTokens = require("../models/auth/UserTokens");
const jsonWebToken = require("jsonwebtoken");
const { SECRET_KEY, EXPIRE_IN } = require("../config/config");
const Sequelize = require("sequelize")
class AuthService {

    static async createUserFromEmployee(employee) {
        const salt = await bcrypt.genSalt(10);
        const randomAlphaNumericString = CommonUtils.generateRandomAlphaNumericString(8);
        console.log('randomAlphaNumericString : ', randomAlphaNumericString);
        const encryptedPassword = bcrypt.hashSync(randomAlphaNumericString, salt);
        var users = {
            username: employee.emailId,
            salt: salt,
            password: encryptedPassword,
            isDeleted: false,
            isLoggedIn: false,
            organizationId: employee.organizationId,
            employeeId: employee.id
        }
        Users.create(users).then(data => { console.log('User Created : ', data) });
    }

    static async getUserByUserName(username) {
        var user = await Users.findAll({
            where: { username: username },
        }).then(data => user = data[0]).catch(error => { console.log('Error in getting user by Username : ', error) });
        return user;
    }

    static async markUserAsLoggedIn(userId, generatedJsonWebToken, refreshToken) {
        Users.update({ isLoggedIn: true }, { where: { id: userId } }).then(data => console.log('number of rows affected : ', data)).catch(err => { console.log('err : ', err) });
        this.createUserToken(userId, generatedJsonWebToken, refreshToken);
    }

    // static async getRefreshToken(payload) {
    //     const refreshToken = jwt.sign({ user: payload }, jwtSecretString, { expiresIn: '30d' }); 
    //     return refreshToken;
    // }

    static async createUserToken(userId, generatedJsonWebToken, refreshToken) {
        var checkWeatherUserLoggedInOrNot = await UserTokens.findAndCountAll({
            where: { userId: userId },
        }).then(data => checkWeatherUserLoggedInOrNot = data.count);
        const userTokens = {
            jwtToken: generatedJsonWebToken,
            userId: userId,
            refershToken: refreshToken
        }
        if (checkWeatherUserLoggedInOrNot && checkWeatherUserLoggedInOrNot != undefined && checkWeatherUserLoggedInOrNot != null && checkWeatherUserLoggedInOrNot > 0) {
            UserTokens.update(userTokens, { where: { userId: userId } }).then(data => console.log('number of rows affected : ', data)).catch(err => { console.log('err : ', err) });
        } else {            
            UserTokens.create(userTokens).then(data => { console.log('User Tokens added : ', data) });
        }        
    }

    static async login(req) {
        var user = await this.getUserByUserName(req.body.username);
        if (user && user != undefined && user != null) {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password);
            if (checkPassword) {
                const userToBeSavedInJwt = {
                    "userId": user.id,
                    "employeeId": user.employeeId,
                }
                const generatedJsonWebToken = await jsonWebToken.sign({ result: userToBeSavedInJwt }, SECRET_KEY, {
                    expiresIn: "2min"
                })
                const refreshToken = await this.getRefereshToken();
                const userToBeReturned = {
                    "accessToken": generatedJsonWebToken,
                    "refreshToken": refreshToken,
                    "user": userToBeSavedInJwt
                }
                await this.markUserAsLoggedIn(user.id, generatedJsonWebToken, refreshToken);
                return userToBeReturned;
            } else {
                throw new Error("INVALID_PASSWORD");
            }
        } else {
            throw new Error("INVALID_LOGIN_CREDENTIAL");
        }
    }

    static async getRefereshToken() {
        const refereshToken = (CommonUtils.generateGUID() + CommonUtils.generateGUID() + "-" + CommonUtils.generateGUID() + "-4" + CommonUtils.generateGUID().substr(0, 3) + "-" + CommonUtils.generateGUID() + "-" + CommonUtils.generateGUID() + CommonUtils.generateGUID() + CommonUtils.generateGUID()).toLowerCase();
        return refereshToken.toString();
    }

    static async getRefreshToken(req) {
        const refershTokenFromUI = req.body.refreshToken;
        const userToBeSavedInJwt = {
            "userId": req.body.userId,
            "employeeId": req.body.employeeId,
        }
        if (refershTokenFromUI && refershTokenFromUI != undefined && refershTokenFromUI != null) {
            const updatedJwtToken = await jsonWebToken.sign({ result: userToBeSavedInJwt }, SECRET_KEY, {
                    expiresIn: "2min"
                });
            const updatedRefereshToken = await this.getRefereshToken();
            const userTokensToUpdate = {
                jwtToken: updatedJwtToken,
                refershToken: updatedRefereshToken
            }
            var numberOfRowsAffected = await UserTokens.update(userTokensToUpdate, { where: { userId: userToBeSavedInJwt.userId, refershToken: refershTokenFromUI } }).then(data => numberOfRowsAffected = data).catch(err => { console.log('err : ', err) });            
            if (numberOfRowsAffected > 0) {
                return userTokensToUpdate;
            } else {
                throw new Error("TOKEN_NOT_UPDATED");
            }
        } else {
            throw new Error("INVALID_REFERESH_TOKEN");
        }
    }

    static async logout(req) {
        var noOfRowsAffected = await Users.update({ isLoggedIn: false }, { where: { id: req.query.userId } }).then(data => noOfRowsAffected = data).catch(err => { console.log('err : ', err) });
        return noOfRowsAffected;
    }
}

module.exports = AuthService;