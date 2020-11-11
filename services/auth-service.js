const bcrypt = require("bcrypt");
const CommonUtils = require("../common-utils/CommonUtils");
const Users = require("../models/auth/Users");
const UserTokens = require("../models/auth/UserTokens");
const RoleEmployee = require("../models/employee/RoleEmployee");
const EmployeeAttendance = require("../models/employee-attendance/EmployeeAttendance");
const jsonWebToken = require("jsonwebtoken");
const { SECRET_KEY, EXPIRE_IN } = require("../config/config");
// const Sequelize = require("sequelize");
const ConstantUtils = require("../common-utils/ConstantUtils");
const Employee = require("../models/employee/Employee");
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
            include: [{
                model: Employee,
                as: 'employee'
            }],
        }).then(data => user = data[0]).catch(error => { console.log('Error in getting user by Username : ', error) });
        return user;
    }

    static async markUserAsLoggedIn(userId, generatedJsonWebToken, refreshToken) {
        Users.update({ isLoggedIn: true }, { where: { id: userId } }).then(data => console.log('number of rows affected : ', data)).catch(err => { console.log('err : ', err) });
        await this.createUserToken(userId, generatedJsonWebToken, refreshToken);
    }

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
        if (user && user != undefined && user != null && user.employee.status == 'ACTIVE') {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password);
            if (checkPassword) {
                const userToBeSavedInJwt = {
                    "userId": user.id,
                    "employeeId": user.employeeId,
                }
                const generatedJsonWebToken = await jsonWebToken.sign({ result: userToBeSavedInJwt }, SECRET_KEY, {
                    expiresIn: EXPIRE_IN
                })
                const refreshToken = await this.generateRefereshToken();
                var roleList = await RoleEmployee.findAll({
                    // include: [{
                    //     model: RoleMaster,
                    //     as: 'role_master',
                    //     // attributes: ['id']
                    // }],
                    where: { employeeId: userToBeSavedInJwt.employeeId, organizationId: user.organizationId },
                    attributes: ['roleMasterId'],
                }
                ).then(data => roleList = data).catch(error => { console.log('Error in getting user by Username : ', error) });
                console.log('roleList : ', roleList);                
                // var attendanceId = await this.markEmployeeAttendance(user.employeeId, user.organizationId);
                const userToBeReturned = {
                    "accessToken": generatedJsonWebToken,
                    "refreshToken": refreshToken,
                    "user": userToBeSavedInJwt,
                    "isLoggedIn": true,
                    "roleList": roleList,
                    // "attendanceId": attendanceId
                }
                await this.markUserAsLoggedIn(user.id, generatedJsonWebToken, refreshToken);
                return userToBeReturned;
            } else {
                throw new Error(ConstantUtils.INVALID_PASSWORD);
            }
        } else {
            throw new Error(ConstantUtils.INVALID_LOGIN_CREDENTIAL);
        }
    }
    
    static async markEmployeeAttendance(employeeId, organizationId) {
        var employeeAttendance = {
            checkIn: new Date(),
            employeeId: employeeId,
            organizationId: organizationId	
        }
        console.log('employeeAttendance : ', employeeAttendance);
        var checkIfAttendanceAlreadyCounted = await EmployeeAttendance.findAndCountAll({ where: { checkIn: employeeAttendance.checkIn, organizationId: employeeAttendance.organizationId, employeeId: employeeAttendance.employeeId } }).then(data => checkIfAttendanceAlreadyCounted = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        console.log('checkIfAttendanceAlreadyCounted : ', checkIfAttendanceAlreadyCounted);
        if (checkIfAttendanceAlreadyCounted != null && checkIfAttendanceAlreadyCounted == 0) {
            var attendanceId = await EmployeeAttendance.create(employeeAttendance).then(data => attendanceId = data.id).catch(error => {console.log('Error in marking attendance of the logged in employee : ', error)})
            return attendanceId;
        } else {
            return 0;
        }        
    }


    static async generateRefereshToken() {
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
                expiresIn: EXPIRE_IN
            });
            const updatedRefereshToken = await this.generateRefereshToken();
            const userTokensToUpdate = {
                jwtToken: updatedJwtToken,
                refershToken: updatedRefereshToken
            }
            var numberOfRowsAffected = await UserTokens.update(userTokensToUpdate, { where: { userId: userToBeSavedInJwt.userId } }).then(data => numberOfRowsAffected = data).catch(err => { console.log('err : ', err) });
            if (numberOfRowsAffected > 0) {
                return userTokensToUpdate;
            } else {
                throw new Error(ConstantUtils.TOKEN_NOT_UPDATED);
            }
        } else {
            throw new Error(ConstantUtils.INVALID_REFERESH_TOKEN);
        }
    }

    static async logout(req) {
        var noOfRowsAffected = await Users.update({ isLoggedIn: false }, { where: { id: req.query.userId } }).then(data => noOfRowsAffected = data).catch(err => { console.log('err : ', err) });
        return noOfRowsAffected;
    }

    static async changePassword(req) {
        var changePasswordReqBody = req.body;
        var userId = req.userId;
        if (changePasswordReqBody.newPassword == changePasswordReqBody.confirmPassword) {
            var userFromDB = await Users.findAll({
                where: { id: userId },
            }).then(data => userFromDB = data[0]).catch(error => { console.log('Error in getting user by Username : ', error) });
            const checkPassword = bcrypt.compareSync(changePasswordReqBody.currentPassword, userFromDB.password);
            if (checkPassword) {
                const salt = await bcrypt.genSalt(10);
                const encryptedPassword = bcrypt.hashSync(changePasswordReqBody.newPassword, salt);
                var userWhosePasswordIstoBeChange = {
                    salt: salt,
                    password: encryptedPassword,
                }
                var changePasswordUser = await Users.update(userWhosePasswordIstoBeChange, { where: { id: userId } }).then(data => changePasswordUser = data).catch(err => { console.log('err in upadting user details in change password : ', err) });
                return changePasswordUser;
            } else {
                throw new Error(ConstantUtils.CURRENT_PASSWORD_INVALID);
            }
        } else {
            throw new Error(ConstantUtils.PASSWORD_NOT_MATCHES);
        }
    }
}

module.exports = AuthService;