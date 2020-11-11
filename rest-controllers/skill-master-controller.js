const SkillMasterService = require('../services/skill-master-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class SkillMasterController {

    static async getSkillMasterListByOrgIdWithPage(req, res) {
        console.log('req.user inside getRoleMasterListByOrgIdWithPage : ', req.user);
        SkillMasterService.getSkillMasterListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveSkillMaster(req, res) {
        SkillMasterService.saveSkillMaster(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateSkillMaster(req, res) {
        SkillMasterService.updateSkillMaster(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getSkillMasterDeatilsById(req, res) {
        SkillMasterService.getSkillMasterDeatilsById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async deleteSkillMasterById(req, res) {
        SkillMasterService.deleteSkillMasterById(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getSkillMasterListByOrgId(req, res) {
        SkillMasterService.getSkillMasterListByOrgId(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = SkillMasterController;