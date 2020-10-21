const Project = require('../models/project/Project');
const EmployeeProject = require('../models/employee/EmployeeProject');
class ProjectService {

    static async getProjectListByOrgIdWithPage(req, res) {
        var limit = req.body.limit;
        var offset = req.body.offset;
        var orgId = req.body.orgId;
        var sortField = req.body.sortField;
        var sortDirection = req.body.sortDirection;
        var projectList = {};
        await Project.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { organizationId: orgId },
            order: [
                [sortField, sortDirection],
            ], // conditions
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
        });
        return projectList;
    }

    static async saveProject(req) {
        if (req.body.timeType == 'FIXED' && req.body.amount == "") {
            throw new Error("AMOUNT_REQUIRED");
        } else {
            var project = {
                name: req.body.name,
                startDate: req.body.startDate,
                endDate: req.body.endDate && req.body.endDate != undefined && req.body.endDate != null ? req.body.endDate : null,
                timeType: req.body.timeType,
                amount: req.body.amount && req.body.amount != undefined && req.body.amount != null ? req.body.amount : null,
                status: req.body.status,
                platformTypeId: req.body.platformTypeId,
                organizationId: req.body.organizationId
            };
            var newProject = await Project.create(project).then(data => newProject = data);
            this.mapProjectToEmployee(newProject.id, req.body.employeeId, req.body.organizationId);
            return newProject;
        }        
    }

    static async updateProject(req) {
        var projectId = req.body.id;
        var project = {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate && req.body.endDate != undefined && req.body.endDate != null ? req.body.endDate : null,
            timeType: req.body.timeType,
            amount: req.body.amount && req.body.amount != undefined && req.body.amount != null ? req.body.amount : null,
            status: req.body.status,
            organizationId: req.body.organizationId,
            platformTypeId: req.body.platformTypeId,
            updatedAt: new Date()
        };
        var updatedProject = await Project.update(project, { where: { id: projectId } }).then(numberOfRowsAffected => updatedProject = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
        this.mapProjectToEmployee(projectId, req.body.employeeId, req.body.organizationId);
        return updatedProject;
    }

    static async checkIfProjectNameAlreadyExists(req) {
        var duplicateRowsCount = await Project.findAndCountAll({ where: { name: req.query.name, organizationId: req.query.orgId } }).then(data => duplicateRowsCount = data.count);
        if (duplicateRowsCount != null && duplicateRowsCount != 0) {
            return false;
        } else {
            return true;
        }
    }

    static async mapProjectToEmployee(projectId, employeeIds, orgId) {
        var countIfEmployeeIsNewCreatedOrNot = await EmployeeProject.findAndCountAll({
            where: { organizationId: orgId, projectId: projectId },
        }).then(data => countIfEmployeeIsNewCreatedOrNot = data.count);
        if (employeeIds && employeeIds != undefined && employeeIds != null && employeeIds.length != 0) {
            for (var i = 0; i < employeeIds.length; i++) {
                var employeeProject = {
                    organizationId: orgId,
                    projectId: projectId,
                    employeeId: employeeIds[i]
                }
                if (countIfEmployeeIsNewCreatedOrNot == 0) {
                    EmployeeProject.create(employeeProject).then(data => { console.log('data to save in employee project : ', data) });
                } else {
                    await EmployeeProject.destroy({
                        where: {
                            organizationId: orgId, projectId: projectId
                        }
                    }).then(data => console.log('number of employee projects deleted : ', data)).catch(err => { throw new Error(err) });
                    EmployeeProject.create(employeeProject).then(data => { console.log('data to save in employee project : ', data) });
                }
            }
        }
    }

    static async getProjectDetailsId(req, res) {
        var project = await Project.findByPk(req.query.projectId).then(data => employee = data);
        var employeeProjectList = await EmployeeProject.findAll({ where: { projectId: req.query.projectId } }).then(data => employeeProjectList = data);
        var projectAndEmployeeProject = {
            project: project,
            employeeProjectList: employeeProjectList
        };
        return projectAndEmployeeProject;
    }
}

module.exports = ProjectService;