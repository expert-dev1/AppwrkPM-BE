const TimeSheetService = require('../services/time-sheet-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class TimeSheetController {

    static async getTimeSheetListIfDefinedAnyWithPagination(req, res) {
        TimeSheetService.getTimeSheetListIfDefinedAnyWithPagination(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveTimeSheets(req, res) {
        TimeSheetService.saveTimeSheets(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getEmployeeTimeSheetForStatusChange(req, res) {
        TimeSheetService.getEmployeeTimeSheetForStatusChange(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async bulkUpdateTimeSheetStatus(req, res) {
        TimeSheetService.bulkUpdateTimeSheetStatus(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }
    
    static async changeStatusOfSingleTaskInTimeSheet(req, res) {
        TimeSheetService.changeStatusOfSingleTaskInTimeSheet(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async deleteTimeSheetFromDb(req, res) {
        TimeSheetService.deleteTimeSheetFromDb(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }
}

module.exports = TimeSheetController;