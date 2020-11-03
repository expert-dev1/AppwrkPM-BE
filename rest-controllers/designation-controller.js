const DesignationService = require('../services/designation-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class DesignationController {

    static async getDesignationListByOrgIdWithPage(req, res) {
        DesignationService.getDesignationListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveDesignation(req, res) {
        DesignationService.saveDesignation(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateDesignation(req, res) {
        DesignationService.updateDesignation(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getDesignationDetailsById(req, res) {
        DesignationService.getDesignationDetailsById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteDesignationById(req, res) {
        DesignationService.deleteDesignationById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getDesignationListByOrgId(req, res) {
        DesignationService.getDesignationListByOrgId(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = DesignationController;