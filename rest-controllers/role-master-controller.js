const RoleMasterService = require('../services/role-master-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class RoleMasterController {

    static async getRoleMasterListByOrgIdWithPage(req, res) {
        console.log('req.user inside getRoleMasterListByOrgIdWithPage : ', req.user);
        RoleMasterService.getRoleMasterListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveRoleMaster(req, res) {
        RoleMasterService.saveRoleMaster(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateRoleMaster(req, res) {
        RoleMasterService.updateRoleMaster(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getRoleMasterDeatilsById(req, res) {
        RoleMasterService.getRoleMasterDeatilsById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteRoleMasterById(req, res) {
        RoleMasterService.deleteRoleMasterById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getRoleMasterListByOrgId(req, res) {
        RoleMasterService.getRoleMasterListByOrgId(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = RoleMasterController;