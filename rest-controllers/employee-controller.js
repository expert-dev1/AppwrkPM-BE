const EmployeeService = require('../services/employee-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');
class EmployeeController {

    static async getEmployeeListByOrgIdWithPage(req, res) {
        EmployeeService.getEmployeeListByOrgIdWithPage(req, res).then(response => {
            const data = { "employeeList": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveEmployee(req, res) {
        EmployeeService.saveEmployee(req, res).then(response => {
            const data = { "employee": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateEmployee(req, res) {
        EmployeeService.updateEmployee(req, res).then(response => {
            const data = { "employee": response }
            RestServiceTemplateUtils.createdSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getEmployeeDetailsId(req, res) {
        EmployeeService.getEmployeeDetailsId(req, res).then(response => {
            const data = { "employee": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async checkEmailIdOfEmployee(req, res) {
        EmployeeService.checkEmailIdOfEmployee(req, res).then(response => {
            const data = { "employee": response }
            RestServiceTemplateUtils.getRecordSuccessResponse(data, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = EmployeeController;