const EmployeeService = require('../services/employee-service')
const RestServiceTemplateUtils = require('../common-utils/RestServiceTemplateUtils');
class EmployeeController {

    static async getEmployeeListByOrgIdWithPage(req, res) {
        EmployeeService.getEmployeeListByOrgIdWithPage(req).then(response => {
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async saveEmployee(req, res) {
        console.log(req.file);
        EmployeeService.saveEmployee(req).then(response => { 
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async updateEmployee(req, res) {
        EmployeeService.updateEmployee(req).then(response => { 
            RestServiceTemplateUtils.createdSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.createdSuccessResponse(err, res);
        });
    }

    static async getEmployeeDetailsId(req, res) {
        EmployeeService.getEmployeeDetailsId(req).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async checkEmailIdOfEmployee(req, res) {
        EmployeeService.checkEmailIdOfEmployee(req).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async getEmployeeListByOrgId(req, res) {
        EmployeeService.getEmployeeListByOrgId(req).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }

    static async changeStatusOfEmployee(req, res) {
        EmployeeService.changeStatusOfEmployee(req).then(response => { 
            RestServiceTemplateUtils.getRecordSuccessResponse(response, res);
        }).catch(error => {
            const err = { "error": error }
            RestServiceTemplateUtils.getRecordSuccessResponse(err, res);
        });
    }
}

module.exports = EmployeeController;