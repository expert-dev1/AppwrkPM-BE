// const { where } = require('sequelize/types');
var Employee = require('../models/employee/Employee');
const Designation = require('../models/designation/Designation');
const RoleEmployee = require('../models/employee/RoleEmployee');
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
        var employee = {
            empCode: await this.getEmployeeCode(req.employee.organizationId),
            firstName: req.body.firstName,
            middleName: req.body.middleName && req.body.middleName != undefined && req.body.middleName != null ? req.body.middleName : null,
            lastName: req.body.lastName,
            status: req.body.status,
            dateOfJoining: req.body.dateOfJoining,
            mobileNumber: req.body.mobileNumber,
            emailId: req.body.emailId,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2 && req.body.addressLine2 != undefined && req.body.addressLine2 != null ? req.body.addressLine2 : null,
            roleMaster: req.body.roleMaster,
            organizationId: req.employee.organizationId,
            designationId: req.body.designationId,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            isDeleted: false
        };
        var duplicateRowsCount = await Employee.findAndCountAll({ where: { emailId: employee.emailId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var newEmployee = await Employee.create(employee).then(data => newEmployee = data);
            this.mapRolesToEmployee(newEmployee.id, req.body.roleMasterId, newEmployee.organizationId);
            AuthService.createUserFromEmployee(newEmployee);
            return newEmployee;
        } else {
            throw new Error(ConstantUtils.EMAIL_ALREADY_EXISTS);
        }
    }

    static async updateEmployee(req) {
        var employeeId = req.body.id;
        var employee = {
            firstName: req.body.firstName,
            middleName: req.body.middleName && req.body.middleName != undefined && req.body.middleName != null && req.body.middleName != "" ? req.body.middleName : null,
            lastName: req.body.lastName,
            dateOfJoining: req.body.dateOfJoining,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            organizationId: req.employee.organizationId,
            designationId: req.body.designationId,
            country: req.body.country,
            status: req.body.status,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            updatedAt: new Date()
        };
        var updatedEmployee = await Employee.update(employee, { where: { id: employeeId } }).then(numberOfRowsAffected => updatedEmployee = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        this.mapRolesToEmployee(employeeId, req.body.roleMasterId, req.employee.organizationId);
        return updatedEmployee;
    }

    static async getEmployeeDetailsId(req) {
        var employee = await Employee.findByPk(req.query.employeeId).then(data => employee = data);
        var roleEmployeeList = await RoleEmployee.findAll({ where: { employeeId: req.query.employeeId } }).then(data => roleEmployeeList = data);
        var employeeAndRoleRmployee = {
            employee: employee,
            roleEmployeeList: roleEmployeeList
        };
        return employeeAndRoleRmployee;
    }

    static async checkEmailIdOfEmployee(req) {
        var duplicateRowsCount = await Employee.findAndCountAll({ where: { emailId: req.query.emailId } }).then(data => duplicateRowsCount = data.count);
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
        var countIfEmployeeIsNewCreatedOrNot = await RoleEmployee.findAndCountAll({
            where: { organizationId: orgId, employeeId: employeeId },
        }).then(data => countIfEmployeeIsNewCreatedOrNot = data.count);
        if (roleMasterIds && roleMasterIds != undefined && roleMasterIds != null && roleMasterIds.length != 0) {
            for (var i = 0; i < roleMasterIds.length; i++) {
                var roleEmployee = {
                    organizationId: orgId,
                    employeeId: employeeId,
                    roleMasterId: roleMasterIds[i]
                }
                if (countIfEmployeeIsNewCreatedOrNot == 0) {
                    RoleEmployee.create(roleEmployee).then(data => { console.log('data to save in role employee : ', data) });
                } else {
                    await RoleEmployee.destroy({
                        where: {
                            organizationId: orgId, employeeId: employeeId
                        }
                    }).then(data => console.log('number of role employee deleted : ', data)).catch(err => { throw new Error(err) });
                    RoleEmployee.create(roleEmployee).then(data => { console.log('data to save in role employee : ', data) });
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
        var updatedEmployee = await Employee.update({isDeleted: true}, { where: { id: req.query.employeeId } }).then(numberOfRowsAffected => updatedEmployee = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        return updatedEmployee;
    }
}

module.exports = EmployeeService;