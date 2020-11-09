const OrganizationCalendarService = require('../services/organization-calendar-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');
class OrganizationCalendarController {

    static async saveOrganizationEvents(req, res) {
        OrganizationCalendarService.saveOrganizationEvents(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async updateOrganizationEvents(req, res) {
        OrganizationCalendarService.updateOrganizationEvents(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getOrganizationEventsById(req, res) {
        OrganizationCalendarService.getOrganizationEventsById(req).then(response => { 
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getEventsAndHolidaysListForOrganizationCalendar(req, res) {
        OrganizationCalendarService.getEventsAndHolidaysListForOrganizationCalendar(req).then(response => { 
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async deleteOrganizationEventsById(req, res) {
        OrganizationCalendarService.deleteOrganizationEventsById(req).then(response => { 
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }
}

module.exports = OrganizationCalendarController;