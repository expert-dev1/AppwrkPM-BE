// const { where } = require('sequelize/types');
var Employee = require('../models/employee/Employee');
var Designation = require('../models/designation/Designation');
const Organization = require('../models/organization/Organization');
var RoleMaster = require('../models/role-master/RoleMaster');
// const sequelize = require('../config/sequelize-db');
class EmployeeService {

    static async getEmployeeListByOrgIdWithPage(req, res) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.body.orgId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var employeeList = {};
        await Employee.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { organizationId: orgId },
            order: [
                [sortField, sortDirection],
            ], // conditions
            include: [{
                model: Organization,
            }]
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
        });
        return employeeList;
    }

    static async saveEmployee(req) {
        var newEmployee = null;
        var employee = {
            empCode: await this.getEmployeeCode(req.body.organizationId),
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
            organizationId: req.body.organizationId,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
        };
        return Employee.create(employee).then(newEmployee);

    }

    static async updateEmployee(req) {
        var employeeId = req.body.id;
        console.log('EmployeeId : ', employeeId);
        var employee = {
            firstName: req.body.firstName,
            middleName: req.body.middleName && req.body.middleName != undefined && req.body.middleName != null && req.body.middleName != "" ? req.body.middleName : null,
            lastName: req.body.lastName,
            status: req.body.status,
            dateOfJoining: req.body.dateOfJoining,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            roleMaster: req.body.roleMaster,
            organizationId: req.body.organizationId,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            updatedAt: new Date()
        };
        var updatedEmployee = await Employee.update(employee, { where: { id: employeeId } }).then(numberOfRowsAffected => updatedEmployee = numberOfRowsAffected).catch(err => { console.log('err : ', err) });;
        return updatedEmployee;
    }

    static async getEmployeeDetailsId(req, res) {
        var employee = await Employee.findByPk(req.query.employeeId).then(data => employee = data);
        return employee;
    }

    static async checkEmailIdOfEmployee(req) {
        var duplicateRowsCount = await Employee.findAndCountAll({ where: { emailId: req.query.emailId } }).then(data => duplicateRowsCount = data.count);
        if (duplicateRowsCount != null && duplicateRowsCount != 0) {
            return "EMAIL_ID_ALREADY_REGISTERED";
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
            systemGeneratedEmpCode = "EMP-00" + incrementedEmpCode;
        } else {
            systemGeneratedEmpCode = "EMP-001";
        }
        return systemGeneratedEmpCode;
    }
}

module.exports = EmployeeService;