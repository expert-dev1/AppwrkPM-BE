const Project = require('../models/project/Project');
const Client = require('../models/client/Client');
const ClientMoreInfo = require('../models/client/ClientMoreInfo');
const EmployeeProject = require('../models/employee/EmployeeProject');
const Employee = require('../models/employee/Employee');
const Organization = require('../models/organization/Organization');
const ConstantUtils = require("../common-utils/ConstantUtils");
const PlatformType = require('../models/seed-data/PlatformType');
const { Op } = require("sequelize");
class ProjectService {

    static async getProjectListByOrgIdWithPage(req) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.body.orgId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var searchString = req.body.searchString && req.body.searchString != undefined && req.body.searchString != null ? req.body.searchString : null;

        var projectList = {};
        if (searchString && searchString != null) {
            await Project.findAndCountAll({
                limit: limit,
                offset: offset,
                include: [{
                    model: Organization,
                    as: 'organization'
                },
                {
                    model: PlatformType,
                    as: 'platform_type'
                }],
                where: {
                    organizationId: orgId,
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        timeType: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        status: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, {
                        amount: {
                            [Op.like]: '%' + searchString + '%'
                        }
                    }, { '$platform_type.name$': { [Op.like]: '%' + searchString + '%' } }]},
                order: [
                    [sortField, sortDirection],
                ],
                
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                projectList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => { console.log('error in getting list of project with pagination : ', error) });
            return projectList;
        } else {
            await Project.findAndCountAll({
                limit: limit,
                offset: offset,
                where: { organizationId: orgId },
                order: [
                    [sortField, sortDirection],
                ],
                include: [{
                    model: Organization,
                    as: 'organization'
                },
                {
                    model: PlatformType,
                    as: 'platform_type'
                }],
            }).then(data => {
                const totalPages = Math.ceil(data.count / limit);
                projectList = {
                    "content": data.rows,
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": offset,
                    "currentPageSize": data.length,
                }
            }).catch(error => { console.log('error in getting list of project with pagination : ', error) });
            return projectList;
        }

    }

    static async saveProjectDTO(req) {
        var projectInfo = req.body.projectInfo;
        var loggedInEmployeeDetails = req.employee;
        var duplicateRowsCount = await Project.findAndCountAll({ where: { name: projectInfo.name, organizationId: loggedInEmployeeDetails.organizationId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            if (req.body.timeType == 'FIXED' && req.body.amount == "") {
                throw new Error(ConstantUtils.AMOUNT_REQUIRED);
            } else {
                var projectInfoToBeSaved = {
                    name: projectInfo.name,
                    description: projectInfo.description,
                    startDate: projectInfo.startDate,
                    endDate: projectInfo.endDate && projectInfo.endDate != '' ? projectInfo.endDate : null,
                    timeType: projectInfo.timeType,
                    amount: projectInfo.amount,
                    status: projectInfo.status,
                    createdBy: req.userId,
                    updatedBy: req.userId,
                    organizationId: loggedInEmployeeDetails.organizationId,
                    platformTypeId: projectInfo.platformTypeId
                }
                var newProject = await Project.create(projectInfoToBeSaved).then(data => newProject = data).catch(error => console.log('error in saving records : ', error));;
                console.log('project info after save : ', newProject);
                var clientInfo = req.body.clientInfo;
                await this.saveClientInfo(newProject, clientInfo);
                var employeeProjectList = req.body.employeeProjectList;
                await this.mapProjectToEmployee(newProject, employeeProjectList);
                return newProject;
            }
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async saveClientInfo(projectDetails, clientInfo) {
        var clientinfoToBeSaved = {
            name: clientInfo.name,
            email: clientInfo.email,
            altEmail: clientInfo.altEmail && clientInfo.altEmail != '' ? clientInfo.altEmail : null,
            skypeId: clientInfo.skypeId,
            moreInfo: clientInfo.moreInfo,
            createdBy: projectDetails.createdBy,
            updatedBy: projectDetails.updatedBy,
            organizationId: projectDetails.organizationId,
            projectId: projectDetails.id
        }
        var newClient = await Client.create(clientinfoToBeSaved).then(data => newClient = data).catch(err => { console.log('error : ', err) });
        var clientMoreInfoList = clientInfo.clientInformations;
        if (clientMoreInfoList && clientMoreInfoList != undefined && clientMoreInfoList != null && clientMoreInfoList.length > 0) {
            for (var i = 0; i < clientMoreInfoList.length; i++) {
                var clientMoreInfo = {
                    key: clientMoreInfoList[i].key,
                    value: clientMoreInfoList[i].value,
                    clientId: newClient.id,
                    organizationId: newClient.organizationId,
                    createdBy: newClient.createdBy,
                    updatedBy: newClient.updatedBy,
                }
                ClientMoreInfo.create(clientMoreInfo).then(data => { console.log('Client More Information after save : ', data) }).catch(err => { throw new Error(err) });
            }
        }
    }

    static async checkIfProjectNameAlreadyExists(req) {
        var orgId = req.employee.organizationId;
        var duplicateRowsCount = await Project.findAndCountAll({ where: { name: req.query.name, organizationId: orgId, id: { [Op.ne]: req.query.projectId } } }).then(data => duplicateRowsCount = data.count);
        if (duplicateRowsCount != null && duplicateRowsCount != 0) {
            return false;
        } else {
            return true;
        }
    }

    static async mapProjectToEmployee(project, employeeProjectList) {
        var countIfEmployeeIsNewCreatedOrNot = await EmployeeProject.findAndCountAll({
            where: { organizationId: project.organizationId, projectId: project.id },
        }).then(data => countIfEmployeeIsNewCreatedOrNot = data.count);
        if (employeeProjectList && employeeProjectList != undefined && employeeProjectList != null && employeeProjectList.length != 0) {
            for (var i = 0; i < employeeProjectList.length; i++) {
                var employeeProject = employeeProjectList[i];
                var employeeProjectId = employeeProjectList[i].id;
                if (employeeProjectId == 0) {
                    var employeeProject = {
                        organizationId: project.organizationId,
                        projectId: project.id,
                        employeeId: employeeProjectList[i].employeeId,
                        checkInDate: employeeProjectList[i].checkInDate,
                        checkOutDate: employeeProjectList[i].checkOutDate ? employeeProjectList[i].checkOutDate : null,
                        createdBy: project.createdBy,
                        updatedBy: project.updatedBy
                    }
                    console.log('employeeProject single record : ', employeeProject);
                    EmployeeProject.create(employeeProject).then(data => { console.log('data to save in employee project : ', data) }).catch(err => { throw new Error(err) });
                } else {
                    var employeeProject = {
                        organizationId: project.organizationId,
                        projectId: project.id,
                        employeeId: employeeProjectList[i].employeeId,
                        checkInDate: employeeProjectList[i].checkInDate,
                        checkOutDate: employeeProjectList[i].checkOutDate ? employeeProjectList[i].checkOutDate : null,
                        updatedBy: project.updatedBy
                    }
                    await EmployeeProject.update(employeeProject, { where: { id: employeeProjectId } }).then(data => console.log('Number of rows effected in update employee project : ', data)).catch(error => console.log('error in saving records : ', error));
                }
            }
        }
    }

    static async getProjectDetailsById(req) {
        var project = await Project.findByPk(req.query.projectId).then(data => project = data);
        var clientInfo = await Client.findAll({ where: { projectId: req.query.projectId } }).then(data => clientInfo = data);
        var clientMoreInformationList = ClientMoreInfo.findAll({ where: { clientId: clientInfo[0].id } }).then(data => clientMoreInformationList = data);
        var employeeProjectList = await EmployeeProject.findAll({
            where: { projectId: req.query.projectId }, include: [{
                model: Employee,
                as: 'employee'
            }],
        }).then(data => employeeProjectList = data);
        var projectAndEmployeeProject = {
            project: project,
            clientInfo: clientInfo[0],
            clientMoreInformationList: clientMoreInformationList,
            employeeProjectList: employeeProjectList
        };
        return projectAndEmployeeProject;
    }

    static async deleteClientMoreInfoById(req) {
        var deletedClientMoreInfo = await ClientMoreInfo.destroy({
            where: {
                id: req.query.clientMoreInfoId
            }
        }).then(data => deletedClientMoreInfo = data).catch(err => { throw new Error(err) });
        return deletedClientMoreInfo;
    }

    static async deleteEmployeeProjectById(req) {
        var deletedEmployeeProjectInfo = await EmployeeProject.destroy({
            where: {
                id: req.query.employeeProjectId
            }
        }).then(data => deletedEmployeeProjectInfo = data).catch(err => { throw new Error(err) });
        return deletedEmployeeProjectInfo;
    }

    static async updateProjectDTO(req) {
        var projectInfo = req.body.projectInfo;
        var projectId = projectInfo.id;
        var loggedInEmployeeDetails = req.employee;
        var duplicateRowsCount = await Project.findAndCountAll({ where: { name: projectInfo.name, organizationId: loggedInEmployeeDetails.organizationId, id: { [Op.ne]: projectId } } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            if (req.body.timeType == 'FIXED' && req.body.amount == "") {
                throw new Error(ConstantUtils.AMOUNT_REQUIRED);
            } else {
                var projectInfoToBeSaved = {
                    name: projectInfo.name,
                    description: projectInfo.description,
                    startDate: projectInfo.startDate,
                    endDate: projectInfo.endDate && projectInfo.endDate != '' ? projectInfo.endDate : null,
                    timeType: projectInfo.timeType,
                    amount: projectInfo.amount,
                    status: projectInfo.status,
                    updatedBy: req.userId,
                    organizationId: loggedInEmployeeDetails.organizationId,
                    platformTypeId: projectInfo.platformTypeId
                }
                await Project.update(projectInfoToBeSaved, { where: { id: projectId } }).then(data => updatedProject = data).catch(error => console.log('error in saving records : ', error));
                var projectDetails = await Project.findByPk(projectId).then(data => projectDetails = data);
                var clientInfo = req.body.clientInfo;
                await this.updateClientInfo(projectDetails, clientInfo);
                var employeeProjectList = req.body.employeeProjectList;
                await this.mapProjectToEmployee(projectDetails, employeeProjectList);
                return projectDetails;
            }
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async updateClientInfo(projectDetails, clientInfo) {
        var clientId = clientInfo.id;
        var clientinfoToBeUpdated = {
            name: clientInfo.name,
            email: clientInfo.email,
            altEmail: clientInfo.altEmail && clientInfo.altEmail != '' ? clientInfo.altEmail : null,
            skypeId: clientInfo.skypeId,
            moreInfo: clientInfo.moreInfo,
            updatedBy: projectDetails.updatedBy,
            organizationId: projectDetails.organizationId,
            projectId: projectDetails.id
        }
        await Client.update(clientinfoToBeUpdated, { where: { id: clientId } }).then(data => console.log('Number of rows affected after updating client information : ', data)).catch(error => console.log('error in saving records : ', error));
        var clientMoreInfoList = clientInfo.clientInformations;
        if (clientMoreInfoList && clientMoreInfoList != undefined && clientMoreInfoList != null && clientMoreInfoList.length > 0) {
            for (var i = 0; i < clientMoreInfoList.length; i++) {
                if (clientMoreInfoList[i].canEdit) {
                    var clientMoreInfoId = clientMoreInfoList[i].id;
                    if (clientMoreInfoId == 0) {
                        var clientMoreInfo = {
                            key: clientMoreInfoList[i].key,
                            value: clientMoreInfoList[i].value,
                            clientId: clientId,
                            organizationId: projectDetails.organizationId,
                            createdBy: projectDetails.createdBy,
                            updatedBy: projectDetails.updatedBy,
                        }
                        ClientMoreInfo.create(clientMoreInfo).then(data => { console.log('Client More Information after save : ', data) }).catch(err => { throw new Error(err) });;
                    } else {
                        var clientMoreInfo = {
                            key: clientMoreInfoList[i].key,
                            value: clientMoreInfoList[i].value,
                            clientId: clientId,
                            organizationId: projectDetails.organizationId,
                            updatedBy: projectDetails.updatedBy,
                        }
                        console.log('clientMoreInfo to update : ', clientMoreInfo);
                        await ClientMoreInfo.update(clientMoreInfo, { where: { id: clientMoreInfoId } }).then(data => console.log('Number of rows affected after updating client more information : ', data)).catch(error => console.log('error in saving records : ', error));
                    }
                }
            }
        }
    }
}

module.exports = ProjectService;