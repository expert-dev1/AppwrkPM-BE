const bcrypt = require("bcrypt");
const CommonUtils = require("../common-utils/CommonUtils");
const Users = require("../models/auth/Users");
const jsonWebToken = require("jsonwebtoken");
const { SECRET_KEY, EXPIRE_IN } = require("../config/config");
class AuthService {

    static async createUserFromEmployee(employee) {
        const salt = await bcrypt.genSalt(10);
        console.log('salt : ', salt);
        const randomAlphaNumericString = CommonUtils.generateRandomAlphaNumericString(8);
        console.log('randomAlphaNumericString : ', randomAlphaNumericString);   
        const encryptedPassword = bcrypt.hashSync(randomAlphaNumericString, salt);    
        console.log('encryptedPassword : ', encryptedPassword);
        var users = {
            username: employee.emailId,
            salt: salt,
            password: encryptedPassword,
            isDeleted: false,
            isLoggedIn: false,
            organizationId: employee.organizationId,
            employeeId: employee.id
        }
        Users.create(users).then(data => {console.log('User Created : ', data)});
    }

    static async getUserByUserName (username) {
        var user = await Users.findAll({where: { username: username },
        }).then(data => user = data[0]).catch(error => {console.log('Error in getting user by Username : ', error)});
        return user;
    }

    static async login (req) {
        var user = this.getUserByUserName(req.body.username);
        if (user && user != undefined && user != null) {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password);
            if (checkPassword) {
                const userstoBeSavedInJwt = {
                    "userId": user.id,
                    "employeeId": user.employeeId
                } 
                const generatedJsonWebToken = jsonWebToken.sign({result: userstoBeSavedInJwt}, SECRET_KEY, {
                    expiresIn: EXPIRE_IN
                });
                return generatedJsonWebToken;
            } else {
                throw new Error("INVALID_PASSWORD");
            }
        } else {
            throw new Error("INVALID_LOGIN_CREDENTIAL");
        }
    }

}

module.exports = AuthService;