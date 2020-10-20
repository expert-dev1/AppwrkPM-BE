const DesignationService = require('../services/designation-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class DesignationController {

    static async getDesignationListByOrgIdWithPage(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        DesignationService.getDesignationListByOrgIdWithPage(req, res).then(response => {
            const data = { "designationList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveDesignation(req, res, next) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        DesignationService.saveDesignation(req, res).then(response => {
            const data = { "designation": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateDesignation(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        DesignationService.updateDesignation(req, res).then(response => {
            const data = { "designation": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getDesignationDetailsById(req, res) {
        DesignationService.getDesignationDetailsById(req, res).then(response => {
            const data = { "designation": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteDesignationById(req, res) {
        DesignationService.deleteDesignationById(req, res).then(response => {
            const data = { "designation": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getDesignationListByOrgId(req, res) {
        DesignationService.getDesignationListByOrgId(req, res).then(response => {
            const data = { "designationList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = DesignationController;