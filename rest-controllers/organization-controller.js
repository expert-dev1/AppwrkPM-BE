const OrganizationService = require('../services/organization-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');
class OrganizationController {

    static async getOrganizationListByOrgIdWithPage(req, res) {
        OrganizationService.getOrganizationListByOrgIdWithPage(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    // static async saveOrganization(req, res) {
    //     OrganizationService.saveOrganization(req, res).then(response => { 
    //         RestServiceTemplateUtils.createdSuccessResponse(response, res);
    //     }).catch(error => {
    //         const err = { "error": error }
    //         RestServiceTemplateUtils.createdSuccessResponse(err, res);
    //     });
    // }

    // static async updateOrganization(req, res) {
    //     OrganizationService.updateOrganization(req, res).then(response => { 
    //         RestServiceTemplateUtils.createdSuccessResponse(response, res);
    //     }).catch(error => {
    //         const err = { "error": error }
    //         RestServiceTemplateUtils.createdSuccessResponse(err, res);
    //     });
    // }
}

module.exports = OrganizationController;