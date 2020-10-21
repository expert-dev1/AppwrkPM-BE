const router = require('express').Router();
const EmployeeController = require('../../rest-controllers/employee-controller');


router.post('/getEmployeeListByOrgIdWithPage', EmployeeController.getEmployeeListByOrgIdWithPage);

router.post('/', EmployeeController.saveEmployee);

router.put('/', EmployeeController.updateEmployee);

router.get('/', EmployeeController.getEmployeeDetailsId);

router.get('/checkEmailIdOfEmployee', EmployeeController.checkEmailIdOfEmployee);

router.get('/getEmployeeListByOrgId', EmployeeController.getEmployeeListByOrgId);

module.exports = router;