const EmployeeService = require('../services/employee-service')

class EmployeeController {

    static async getEmployeeListByOrgIdWithPage(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        var data = await EmployeeService.getEmployeeListByOrgIdWithPage(req, res);
        res.send(data);
    }

    static async saveEmployee(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        EmployeeService.saveEmployee(req, res).then(data => {
            res.send(data);
        });
    }

    static async updateEmployee(req, res) {
        // var data = { "id": 1, "name": "Amit Malik", "age": 26 };
        EmployeeService.updateEmployee(req, res).then(data => {
            res.send(data);
        }); 
    }

    static async getEmployeeDetailsId(req, res) {
        var data = await EmployeeService.getEmployeeDetailsId(req, res);
        res.send(data);
    }

    static async checkEmailIdOfEmployee(req, res) {
        var data = await EmployeeService.checkEmailIdOfEmployee(req, res);
        var response = {
            message: "Record Successfully fetched",
            status: 200,
            data: {
                employee: data
            }
        }
        res.send(response);
    }
}

module.exports = EmployeeController;