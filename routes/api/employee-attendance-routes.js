const router = require('express').Router();
const EmployeeAttendanceController = require('../../rest-controllers/employee-attendance-controller');


router.post('/getEmployeeAttendanceListByOrgIdWithPage', EmployeeAttendanceController.getEmployeeAttendanceListByOrgIdWithPage);

router.post('/', EmployeeAttendanceController.saveEmployeeAttendance);

router.get('/checkIfUserCheckedInOrNot', EmployeeAttendanceController.checkIfUserCheckedInOrNot);

module.exports = router;