const RoleMasterService = require('../services/role-master-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class RoleMasterController {

    static async getRoleMasterListByOrgIdWithPage(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        RoleMasterService.getRoleMasterListByOrgIdWithPage(req, res).then(response => {
            const data = { "roleMasterList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveRoleMaster(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        RoleMasterService.saveRoleMaster(req, res).then(response => {
            const data = { "roleMaster": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateRoleMaster(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        RoleMasterService.updateRoleMaster(req, res).then(response => {
            const data = { "roleMaster": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getRoleMasterDeatilsById(req, res) {
        RoleMasterService.getRoleMasterDeatilsById(req, res).then(response => {
            const data = { "roleMaster": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteRoleMasterById(req, res) {
        RoleMasterService.deleteRoleMasterById(req, res).then(response => {
            const data = { "roleMaster": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getRoleMasterListByOrgId(req, res) {
        RoleMasterService.getRoleMasterListByOrgId(req, res).then(response => {
            const data = { "roleMasterList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = RoleMasterController;