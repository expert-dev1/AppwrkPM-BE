const router = require('express').Router();
const EmployeeController = require('../../rest-controllers/employee-controller');
const multer  = require('multer')
const upload = multer({ dest: 'storage/' })

router.post('/getEmployeeListByOrgIdWithPage', EmployeeController.getEmployeeListByOrgIdWithPage);

router.post('/', upload.single('photo'), EmployeeController.saveEmployee);

router.put('/', EmployeeController.updateEmployee);

router.get('/', EmployeeController.getEmployeeDetailsId);

router.get('/checkEmailIdOfEmployee', EmployeeController.checkEmailIdOfEmployee);

router.get('/getEmployeeListByOrgId', EmployeeController.getEmployeeListByOrgId);

module.exports = router;