const DesignationService = require('../services/designation-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class DesignationController {

    static async getDesignationListByOrgIdWithPage(req, res) {
        DesignationService.getDesignationListByOrgIdWithPage(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveDesignation(req, res, next) {
        DesignationService.saveDesignation(req, res).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateDesignation(req, res) {
        DesignationService.updateDesignation(req, res).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getDesignationDetailsById(req, res) {
        DesignationService.getDesignationDetailsById(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteDesignationById(req, res) {
        DesignationService.deleteDesignationById(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getDesignationListByOrgId(req, res) {
        DesignationService.getDesignationListByOrgId(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = DesignationController;