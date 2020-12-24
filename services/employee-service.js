// const { where } = require('sequelize/types');
var Employee = require('../models/employee/Employee');
const Designation = require('../models/designation/Designation');
const RoleEmployee = require('../models/employee/RoleEmployee');
const SkillEmployee = require('../models/employee/SkillEmployee');
const AuthService = require('../services/auth-service');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Sequelize, Op } = require('sequelize');


class EmployeeService {

    static async getEmployeeListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var employeeList = {};
        if (searchString && searchString != null) {
            await Employee.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Designation,
                    as: 'designation'
                }],
                where: {
                    organizationId: orgId,
                    isDeleted: false,
                    [Op.or]: [{
                        empCode: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        firstName: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        lastName: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        status: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        emailId: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, { '$designation.name$': { [Op.like]: '%' + searchString + '%' } }]
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ], // conditions
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => console.log('error in getting employee list : ', error));
            return employeeList;
        } else {
            await Employee.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Designation,
                    as: 'designation'
                }],
                where: {
                    organizationId: orgId,
                    isDeleted: false,
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ], // conditions
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => console.log('error in getting employee list : ', error));
            return employeeList;
        }
    }

    static async saveEmployee(req) {
        var address = this.mapAddress(req);
        var employee = {
            empCode: await this.getEmployeeCode(req.employee.organizationId),
            firstName: req.body.firstName,
            middleName: req.body.middleName && req.body.middleName != undefined && req.body.middleName != null ? req.body.middleName : null,
            lastName: req.body.lastName,
            status: req.body.status,
            dateOfJoining: req.body.dateOfJoining,
            mobileNumber: req.body.mobileNumber,
            emailId: req.body.emailId,
            roleMaster: req.body.roleMaster,
            organizationId: req.employee.organizationId,
            designationId: req.body.designationId,
            isDeleted: false,
            ...address,
            imagePath: req.file && req.file.path || ''
        };
        var duplicateRowsCount = await Employee.findAndCountAll({ where: { emailId: employee.emailId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var newEmployee = await Employee.create(employee).then(data => newEmployee = data);
            this.mapRolesToEmployee(newEmployee.id, req.body.roleMasterId, newEmployee.organizationId);
            this.mapSkillsToEmployee(newEmployee.id, req.body.skillMasterIds, newEmployee.organizationId);
            AuthService.createUserFromEmployee(newEmployee);
            return newEmployee;
        } else {
            throw new Error(ConstantUtils.EMAIL_ALREADY_EXISTS);
        }
    }

    static async updateEmployee(req) {
        console.log('Request file : ', req.imagePath);
        var employeeId = req.body.id;
        var address = this.mapAddress(req);
        var employee = {
            firstName: req.body.firstName,
            middleName: req.body.middleName && req.body.middleName != undefined && req.body.middleName != null && req.body.middleName != "" ? req.body.middleName : null,
            lastName: req.body.lastName,
            dateOfJoining: req.body.dateOfJoining,
            organizationId: req.employee.organizationId,
            designationId: req.body.designationId,
            updatedAt: new Date(),
            ...address,
            imagePath: req.file && req.file.path || ''
        };
        var updatedEmployee = await Employee.update(employee, { where: { id: employeeId } }).then(numberOfRowsAffected => updatedEmployee = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        this.mapRolesToEmployee(employeeId, req.body.roleMasterId, req.employee.organizationId);
        this.mapSkillsToEmployee(employeeId, req.body.skillMasterIds, req.employee.organizationId);
        return updatedEmployee;
    }

    static async getEmployeeDetailsId(req) {
        var employee = await Employee.findByPk(req.query.employeeId).then(data => employee = data);
        var roleEmployeeList = await RoleEmployee.findAll({ where: { employeeId: req.query.employeeId } }).then(data => roleEmployeeList = data);
        var skillEmployeeList = await SkillEmployee.findAll({ where: { employeeId: req.query.employeeId } }).then(data => skillEmployeeList = data);
        var employeeAndRoleRmployee = {
            employee: employee,
            roleEmployeeList: roleEmployeeList,
            skillEmployeeList: skillEmployeeList
        };
        return employeeAndRoleRmployee;
    }

    static async checkEmailIdOfEmployee(req) {
        var duplicateRowsCount = await Employee.findAndCountAll({ where: { emailId: req.query.emailId } }).then(data => duplicateRowsCount = data.count).catch(error => {
            console.log('Error inside dupliocate email : ', error);
        });
        console.log('duplicateRowsCount : ', duplicateRowsCount);
        if (duplicateRowsCount != null && duplicateRowsCount != 0) {
            return false;
        } else {
            return true;
        }
    }

    static async getEmployeeCode(orgId) {
        let systemGeneratedEmpCode = null;
        let lastSavedEmployeeCode = null;
        lastSavedEmployeeCode = await Employee.findAndCountAll({
            where: { organizationId: orgId },
            order: [
                ["id", "DESC"],
            ],
        }).then(data => lastSavedEmployeeCode = data.rows);
        if (lastSavedEmployeeCode && lastSavedEmployeeCode != undefined && lastSavedEmployeeCode != null && lastSavedEmployeeCode.length > 0) {
            let empCodeInInteger = parseInt(lastSavedEmployeeCode[0].empCode.split("-")[1]);
            let incrementedEmpCode = empCodeInInteger + 1;
            systemGeneratedEmpCode = ConstantUtils.EMPLOYEE_CODE_PREFIX + incrementedEmpCode;
        } else {
            systemGeneratedEmpCode = ConstantUtils.EMPLOYEE_CODE_PREFIX + "001";
        }
        return systemGeneratedEmpCode;
    }

    static async mapRolesToEmployee(employeeId, roleMasterIds, orgId) {
        if (roleMasterIds && roleMasterIds != undefined && roleMasterIds != null) {
            var countIfEmployeeIsNewCreatedOrNot = await RoleEmployee.findAndCountAll({
                where: { organizationId: orgId, employeeId: employeeId },
            }).then(data => countIfEmployeeIsNewCreatedOrNot = data.count);
            var roleMasterIdsList = roleMasterIds.split(",");
            if (roleMasterIdsList && roleMasterIdsList.length > 0) {
                if (countIfEmployeeIsNewCreatedOrNot > 0) {
                    await RoleEmployee.destroy({
                        where: {
                            organizationId: orgId, employeeId: employeeId
                        }
                    }).then(data => console.log('number of role employee deleted : ', data)).catch(err => { throw new Error(err) });
                }
                if (roleMasterIdsList && roleMasterIdsList != undefined && roleMasterIdsList != null && roleMasterIdsList.length != 0) {
                    for (var i = 0; i < roleMasterIdsList.length; i++) {
                        var roleEmployee = {
                            organizationId: orgId,
                            employeeId: employeeId,
                            roleMasterId: roleMasterIdsList[i]
                        }
                        RoleEmployee.create(roleEmployee).then(data => { console.log('data to save in role employee : ', data) });
                    }
                }
            }
        }

    }

    static async getEmployeeListByOrgId(req) {
        var employeeList = await Employee.findAll({
            where: { organizationId: req.employee.organizationId },
            include: [{
                model: Designation,
                as: 'designation',
                attributes: ['name']
            }],
            attributes: ['empCode', 'firstName', 'id', 'lastName', 'fullName'],
        }).then(data => employeeList = data);
        return employeeList;
    }

    static async changeStatusOfEmployee(req) {
        var updatedEmployee = await Employee.update({ isDeleted: true }, { where: { id: req.query.employeeId } }).then(numberOfRowsAffected => updatedEmployee = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        return updatedEmployee;
    }

    static mapAddress(req) {
        var address = {
            permanentAddressLine1: req.body.permanentAddressLine1,
            permanentAddressLine2: req.body.permanentAddressLine2 && req.body.permanentAddressLine2 != undefined && req.body.permanentAddressLine2 != null ? req.body.permanentAddressLine2 : null,
            permanentCountry: req.body.permanentCountry,
            permanentState: req.body.permanentState,
            permanentCity: req.body.permanentCity,
            permanentPincode: req.body.permanentPincode,
            currentAddressLine1: req.body.currentAddressLine1,
            currentAddressLine2: req.body.currentAddressLine2 && req.body.currentAddressLine2 != undefined && req.body.currentAddressLine2 != null ? req.body.currentAddressLine2 : null,
            currentCountry: req.body.currentCountry,
            currentState: req.body.currentState,
            currentCity: req.body.currentCity,
            currentPincode: req.body.currentPincode
        };
        if (req.body.sameAsPermanentAddress) {
            address = {
                ...address,
                currentAddressLine1: req.body.permanentAddressLine1,
                currentAddressLine2: req.body.permanentAddressLine2 && req.body.permanentAddressLine2 != undefined && req.body.permanentAddressLine2 != null ? req.body.permanentAddressLine2 : null,
                currentCountry: req.body.permanentCountry,
                currentState: req.body.permanentState,
                currentCity: req.body.permanentCity,
                currentPincode: req.body.permanentPincode
            }
        }
        return address;
    }

    static async mapSkillsToEmployee(employeeId, skillsMasterIds, orgId) {
        if (skillsMasterIds && skillsMasterIds != undefined && skillsMasterIds != null) {
            var countIfEmployeeIsNewCreatedOrNot = await SkillEmployee.findAndCountAll({
                where: { employeeId: employeeId },
            }).then(data => countIfEmployeeIsNewCreatedOrNot = data.count);
            var skillMasterIdsList = skillsMasterIds.split(",");
            if (skillMasterIdsList && skillMasterIdsList.length > 0) {
                if (countIfEmployeeIsNewCreatedOrNot > 0) {
                    await SkillEmployee.destroy({
                        where: {
                            organizationId: orgId, employeeId: employeeId
                        }
                    }).then(data => console.log('number of skill employee deleted : ', data)).catch(err => { throw new Error(err) });
                }
                if (skillMasterIdsList && skillMasterIdsList != undefined && skillMasterIdsList != null && skillMasterIdsList.length != 0) {
                    for (var i = 0; i < skillMasterIdsList.length; i++) {
                        console.log('SkillsIds : ', skillMasterIdsList[i]);
                        var skillEmployee = {
                            organizationId: orgId,
                            employeeId: employeeId,
                            skillMasterId: skillMasterIdsList[i]
                        }
                        SkillEmployee.create(skillEmployee).then(data => { console.log('data to save in skill employee : ', data) });
                    }
                }
            }
        }
    }


}

module.exports = EmployeeService;