const ProjectService = require('../services/project-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class ProjectController {

    static async getProjectListByOrgIdWithPage(req, res) {
        ProjectService.getProjectListByOrgIdWithPage(req, res).then(response => {
            const data = { "projectList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveProject(req, res) {
        ProjectService.saveProject(req, res).then(response => {
            const data = { "project": response }
            console.log('inside save methode of controller success : ', response);
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            console.log('inside save methode of controller error : ', error);
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateProject(req, res) {
        ProjectService.updateProject(req, res).then(response => {
            const data = { "project": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getProjectDetailsId(req, res) {
        ProjectService.getProjectDetailsId(req, res).then(response => {
            const data = { "project": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async checkIfProjectNameAlreadyExists(req, res) {
        ProjectService.checkIfProjectNameAlreadyExists(req, res).then(response => {
            const data = { "project": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = ProjectController;