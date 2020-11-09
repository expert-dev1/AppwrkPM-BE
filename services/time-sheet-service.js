// const Sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const EmployeeTimeSheet = require("../models/time-sheet/EmployeeTimeSheet");
const { Sequelize, Op } = require('sequelize');
const Project = require("../models/project/Project");
const Employee = require("../models/employee/Employee");
const sendEmail = require("../common-utils/email-config")
class TimeSheetService {

    static async getTimeSheetListIfDefinedAnyWithPagination(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var employeeTimeSheetList = {};
        if (searchString && searchString != null) {
            await EmployeeTimeSheet.findAndCountAll({
                // limit: limit,
                // offset: offset,
                include: [{
                    model: Project,
                    as: 'project'
                }, {
                    model: Employee,
                    as: 'employee'
                }],
                where: {
                    organizationId: orgId,
                    employeeId: req.employee.id,
                    [Op.or]: [{
                        isRejected: true,
                        taskName: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        taskDescription: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        numberOfHours: searchString
                    }, { '$project.name$': { [Op.like]: '%' + searchString + '%' } },
                    { '$employee.firstName$': { [Op.like]: '%' + searchString + '%' } }]
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeTimeSheetList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }
            ).catch(error => console.log('error in getting employee time sheet list : ', error));
            return employeeTimeSheetList;
        } else {
            await EmployeeTimeSheet.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Project,
                    as: 'project'
                }, {
                    model: Employee,
                    as: 'employee'
                }],
                where: {
                    organizationId: orgId,
                    employeeId: req.employee.id,
                    [Op.or]: {
                        isRejected: true
                    }
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeTimeSheetList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }
            ).catch(error => console.log('error in getting employee time sheet list : ', error));
            console.log('employeeTimeSheetList : ', employeeTimeSheetList);
            return employeeTimeSheetList;
        }
    }

    static async saveTimeSheets(req) {
        var timeSheetList = req.body;
        var loggedInEmployee = req.employee;
        var savedTimeSheet = [];
        var projectIdsList = [];
        if (timeSheetList && timeSheetList != undefined && timeSheetList != null && timeSheetList.length > 0) {
            for (var i = 0; i < timeSheetList.length; i++) {
                var timeSheetId = timeSheetList[i].id;
                var timeSheetToSaved = {
                    taskName: timeSheetList[i].taskName,
                    taskDescription: timeSheetList[i].taskDescription,
                    taskDate: timeSheetList[i].taskDate,
                    numberOfHours: timeSheetList[i].numberOfHours,
                    isApproved: false,
                    isRejected: false,
                    isPending: true,
                    organizationId: loggedInEmployee.organizationId,
                    projectId: timeSheetList[i].projectId,
                    employeeId: loggedInEmployee.id,
                }
                console.log('Project Id In each obj : ', timeSheetToSaved.projectId);
                var indexToCheckProjectAlreadyAddedOrNot = projectIdsList.indexOf(timeSheetToSaved.projectId);
                console.log('indexToCheckProjectAlreadyAddedOrNot : ', indexToCheckProjectAlreadyAddedOrNot);
                if (indexToCheckProjectAlreadyAddedOrNot === -1) {
                    projectIdsList.push(timeSheetToSaved.projectId);
                }
                if (timeSheetId != 0) {
                    timeSheetToSaved.updatedBy = loggedInEmployee.id;
                    var updatedOrNot = await EmployeeTimeSheet.update(timeSheetToSaved, { where: { id: timeSheetId } }).then(data => updatedOrNot).catch(error => { console.log('Error in updating time sheet : ', error) });
                    var updatedRecordToShowOnUI = await EmployeeTimeSheet.findByPk(timeSheetId).then(data => updatedRecordToShowOnUI = data).catch(error => { console.log('Error in getting Employee Time Sheet after update : ', error) });
                    savedTimeSheet.push(timeSheetCreated);
                } else {
                    timeSheetToSaved.createdBy = loggedInEmployee.id;
                    timeSheetToSaved.updatedBy = loggedInEmployee.id;
                    var timeSheetCreated = await EmployeeTimeSheet.create(timeSheetToSaved).then(data => timeSheetCreated = data).catch(error => { console.log('Error in saving time sheet : ', error) });
                    savedTimeSheet.push(timeSheetCreated);
                }
                // this.mailSendingLogic(timeSheetToSaved);
            }
            this.sendMailToTheProjectInChargeForApproval(req, savedTimeSheet, projectIdsList);
            return savedTimeSheet;
        }
    }

    static async sendMailToTheProjectInChargeForApproval(req, timeSheetsSavedList, projectIdsList) {
        if (projectIdsList && projectIdsList != undefined && projectIdsList != null && projectIdsList.length > 0) {
            for (var i = 0; i < projectIdsList.length; i++) {
                var projectDetails = await Project.findOne({
                    include: [{
                        model: Employee,
                        as: 'inCharge'
                    }],
                    where:
                        { id: projectIdsList[i] }
                }).then(data => projectDetails = data).catch(error => { console.log('Error in getting project details by Id in findOne : ', error) });
                // console.log('Project Details : ', projectDetails.inCharge.fullName);
                var prepareEmailToSend = {
                    from: req.employee.emailId,
                    to: projectDetails.inCharge.emailId,
                    subject: `Time sheet of ` + req.employee.fullName + ` for approval`,
                }
                var text = `Hello ` + projectDetails.inCharge.fullName + ` sir, \n \n

                    Task Details for project ` + projectDetails.name + ` are : \n`;
                var projectWiseTaskList = timeSheetsSavedList.filter(element => element.projectId == projectIdsList[i]);
                for (var j = 0; j < projectWiseTaskList.length; j++) {
                    text += j + `. ` + projectWiseTaskList[j].taskName + ` : ` + projectWiseTaskList[j].taskDescription + `\n`;
                }
                text += `Thanks & regards, \n` + req.employee.fullName;
                prepareEmailToSend.text = text;
                sendEmail(prepareEmailToSend);
            }
        }
    }

    static async getEmployeeTimeSheetForStatusChange(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.employee.organizationId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;
        var employeeTimeSheetList = {};
        if (searchString && searchString != null) {
            await EmployeeTimeSheet.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Project,
                    as: 'project'
                }, {
                    model: Employee,
                    as: 'employee'
                }],
                where: {
                    organizationId: orgId,
                    '$project.inchargeId$': req.employee.id,
                    [Op.or]: [{
                        taskName: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        taskDescription: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        numberOfHours: {
                            [Op.eq]: searchString
                        }
                    }, { '$project.name$': { [Op.like]: '%' + searchString + '%' } },
                    { '$employee.firstName$': { [Op.like]: '%' + searchString + '%' } }]
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeTimeSheetList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => console.log('error in getting employee time sheet list : ', error));
            return employeeTimeSheetList;
        } else {
            await EmployeeTimeSheet.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Project,
                    as: 'project'
                }, {
                    model: Employee,
                    as: 'employee'
                }],
                where: {
                    organizationId: orgId,
                    '$project.inchargeId$': req.employee.id,
                },
                order: [
                    [Sequelize.literal(sortField), sortDirection],
                ],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                employeeTimeSheetList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => console.log('error in getting employee time sheet list : ', error));
            return employeeTimeSheetList;
        }
    }

    static async bulkUpdateTimeSheetStatus(req) {
        var timeSheetListToBeUpdated = req.body;
        var timeSheetStatusUpdated = [];
        if (timeSheetListToBeUpdated && timeSheetListToBeUpdated != undefined && timeSheetListToBeUpdated != null && timeSheetListToBeUpdated.length > 0) {
            for (var i = 0; i < timeSheetListToBeUpdated.length; i++) {
                console.log('timeSheetListToBeUpdated : ', timeSheetListToBeUpdated[i]);
                var employeeSheetToUpdate = {
                    isApproved: timeSheetListToBeUpdated[i].isApproved,
                    isRejected: timeSheetListToBeUpdated[i].isRejected,
                    isPending: timeSheetListToBeUpdated[i].isPending,
                    updatedBy: req.userId
                }
                await EmployeeTimeSheet.update(employeeSheetToUpdate, { where: { id: timeSheetListToBeUpdated[i].id } }).then(data => timeSheetStatusUpdated.push(data)).catch(err => { console.log('err in bulk update of time sheet status : ', err) });
            }
        }
        return timeSheetStatusUpdated;
    }

    static async changeStatusOfSingleTaskInTimeSheet(req) {
        var employeeSheetToUpdate = {
            isApproved: req.body.isApproved,
            isRejected: req.body.isRejected,
            isPending: req.body.isPending,
            updatedBy: req.userId
        }
        var numberOfRowsAffected = await EmployeeTimeSheet.update(employeeSheetToUpdate, { where: { id: req.body.id } }).then(data => numberOfRowsAffected = data).catch(err => { console.log('err in updating status for single task : ', err) });
        return numberOfRowsAffected;
    }

    static async deleteTimeSheetFromDb(req) {
        var deletedRecords = await EmployeeTimeSheet.destroy({
            where: {
                id: req.query.timeSheetId
            }
        }).then(data => deletedRecords = data).catch(err => { throw new Error(err) });
        return deletedRecords;
    }
}

module.exports = TimeSheetService;