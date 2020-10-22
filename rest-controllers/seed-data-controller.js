const SeedDataService = require('../services/seed-data-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class SeedDataController {

    static async getAllCountryList(req, res) {
        SeedDataService.getAllCountryList(req, res).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getAllStateListByCountryId(req, res) {
        SeedDataService.getAllStateListByCountryId(req, res).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getAllCityListByStateId(req, res) {
        SeedDataService.getAllCityListByStateId(req, res).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getPlatformTypeList(req, res) {
        SeedDataService.getPlatformTypeList(req, res).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = SeedDataController;