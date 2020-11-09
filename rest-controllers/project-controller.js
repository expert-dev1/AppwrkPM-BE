const ProjectService = require('../services/project-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class ProjectController {

    static async getProjectListByOrgIdWithPage(req, res) {
        ProjectService.getProjectListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveProjectDTO(req, res) {
        ProjectService.saveProjectDTO(req).then(response => {
            console.log('response : ', response);
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            console.log('Error : ', error);
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateProjectDTO(req, res) {
        ProjectService.updateProjectDTO(req).then(response => {
            console.log('response : ', response);
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            console.log('Error : ', error);
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    // static async updateProject(req, res) {
    //     ProjectService.updateProject(req).then(response => {
    //         RestServiceTemplateUtils.createdSuccessResponse(response, res);
    //     }).catch(error => {
    //         const err = { "error": error }
    //         RestServiceTemplateUtils.createdSuccessResponse(err, res);
    //     });
    // }

    static async getProjectDetailsById(req, res) {
        ProjectService.getProjectDetailsById(req).then(response => {
            console.log('response : ', response);
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            console.log('Error : ', error);
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async checkIfProjectNameAlreadyExists(req, res) {
        ProjectService.checkIfProjectNameAlreadyExists(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteClientMoreInfoById(req, res) {
        ProjectService.deleteClientMoreInfoById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteEmployeeProjectById(req, res) {
        ProjectService.deleteEmployeeProjectById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getProjectListByOrgIdAndLoggedInEmployeeId(req, res) {
        ProjectService.getProjectListByOrgIdAndLoggedInEmployeeId(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = ProjectController;