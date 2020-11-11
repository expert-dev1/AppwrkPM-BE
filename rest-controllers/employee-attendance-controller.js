const EmployeeAttendanceService = require('../services/employee-attendance-service');
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');

class EmployeeAttendanceController {

    static async getEmployeeAttendanceListByOrgIdWithPage(req, res) {
        EmployeeAttendanceService.getEmployeeAttendanceListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveEmployeeAttendance(req, res) {
        EmployeeAttendanceService.saveEmployeeAttendance(req).then(response => {
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async checkIfUserCheckedInOrNot(req, res) {
        EmployeeAttendanceService.checkIfUserCheckedInOrNot(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = EmployeeAttendanceController;