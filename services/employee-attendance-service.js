// const { where } = require('sequelize/types');
const Organization = require('../models/organization/Organization');
const EmployeeAttendance = require('../models/employee-attendance/EmployeeAttendance');
const Employee = require('../models/employee/Employee');
const Designation = require('../models/designation/Designation');
// const Sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");
const sequelize = require('../config/sequelize-db');

class EmployeeAttendanceService {

    static async getEmployeeAttendanceListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var employeeAttendanceList = {};
        if (searchString && searchString != null) {
            await EmployeeAttendance.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Employee,
                    as: 'employee',
                    include: [{
                        model: Designation,
                        as: 'designation',
                    }]
                }],
                where: {
                    organizationId: orgId,
                    [Op.or]: [{
                        status: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        breakTimeInMin: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    },
                    { '$employee.firstName$': { [Op.like]: '%' + searchString + '%' } },
                    { '$employee.designation.name$': { [Op.like]: '%' + searchString + '%' } }]
                },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeAttendanceList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return employeeAttendanceList;
        } else {
            await EmployeeAttendance.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Employee,
                    as: 'employee',
                    include: [{
                        model: Designation,
                        as: 'designation',
                    }]
                }],
                where: { organizationId: orgId },
                order: [
                    [sortField, sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeAttendanceList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            });
            return employeeAttendanceList;
        }

    }

    static async saveEmployeeAttendance(req) {
        var employeeAttendanceDetails = null;
        var employeeAttendanceId = req.body.id;
        if (employeeAttendanceId != 0) {
            var numberOfRowsAffected = await EmployeeAttendance.update({ checkOutDate: req.body.checkOutDate, status: req.body.status, breakTimeInMin: req.body.breakTimeInMin }, { where: { id: employeeAttendanceId } }).then(data => numberOfRowsAffected = data).catch(error => {
                throw new Error(error);
            });
            await EmployeeAttendance.findByPk(employeeAttendanceId).then(data => employeeAttendanceDetails = data).catch(error => {
                throw new Error(error);
            });
            return employeeAttendanceDetails;
        } else {
            var employeeAttendance = {
                checkInDate: req.body.checkInDate,
                status: req.body.status,
                employeeId: req.employee.id,
                organizationId: req.employee.organizationId,
            };
            await EmployeeAttendance.create(employeeAttendance).then(data => employeeAttendanceDetails = data).catch(error => {
                throw new Error(error);
            });
            return employeeAttendanceDetails;
        }
    }

    static async saveEmployeeAttendance(req) {
        var employeeAttendanceDetails = null;
        var employeeAttendanceId = req.body.id;
        if (employeeAttendanceId != 0) {
            var numberOfRowsAffected = await EmployeeAttendance.update({ checkOutDate: req.body.checkOutDate, status: req.body.status, breakTimeInMin: req.body.breakTimeInMin }, {
                where: {
                    id : employeeAttendanceId
                }
            }).then(data => numberOfRowsAffected = data).catch(error => {
                throw new Error(error);
            });;
            await EmployeeAttendance.findByPk(employeeAttendanceId).then(data => employeeAttendanceDetails = data).catch(error => {
                throw new Error(error);
            });;
            return employeeAttendanceDetails;
        } else {
            var employeeAttendance = {
                checkInDate: req.body.checkInDate,
                status: req.body.status,
                employeeId: req.employee.id,
                organizationId: req.employee.organizationId,
            };
            await EmployeeAttendance.create(employeeAttendance).then(data => employeeAttendanceDetails = data).catch(error => {
                throw new Error(error);
            });
            return employeeAttendanceDetails;
        }
    }

    static async checkIfUserCheckedInOrNot(req) {
        var currentDate = new Date();
        var date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
        console.log('date => ', date);
        var loggedInEmployeeId = req.employee.id;
        // var records = await EmployeeAttendance.findAll({
        //     where: { organizationId: req.employee.organizationId, employeeId: loggedInEmployeeId, isMarkedAttendance: true, checkInDate: currentDate }
        // }).then(data => records = data).catch(error => { console.log('Error checkIfUserCheckedInOrNot : ', error) });
        var records = await EmployeeAttendance.findAll({

            where: {
                [Op.and]: [
                    {
                        organizationId: req.employee.organizationId,
                        employeeId: req.employee.id,
                        status: "CHECK_IN",                        
                    },
                    sequelize.where(sequelize.fn('date', sequelize.col('checkInDate')), '<=', date)
                ]
            }
        }).then(data => records = data).catch(error => { console.log('Error checkIfUserCheckedInOrNot : ', error) });;
        console.log('Records : ', records);
        return records[0];
    }
}

module.exports = EmployeeAttendanceService;