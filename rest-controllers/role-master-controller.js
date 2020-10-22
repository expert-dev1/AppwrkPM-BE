const RoleMasterService = require('../services/role-master-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class RoleMasterController {

    static async getRoleMasterListByOrgIdWithPage(req, res) {
        RoleMasterService.getRoleMasterListByOrgIdWithPage(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveRoleMaster(req, res) {
        RoleMasterService.saveRoleMaster(req, res).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateRoleMaster(req, res) {
        RoleMasterService.updateRoleMaster(req, res).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getRoleMasterDeatilsById(req, res) {
        RoleMasterService.getRoleMasterDeatilsById(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteRoleMasterById(req, res) {
        RoleMasterService.deleteRoleMasterById(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getRoleMasterListByOrgId(req, res) {
        RoleMasterService.getRoleMasterListByOrgId(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = RoleMasterController;