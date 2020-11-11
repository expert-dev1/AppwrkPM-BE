const router = require('express').Router();
const EmployeeController = require('../../rest-controllers/employee-controller');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './storage/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-')+'__' + file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('/getEmployeeListByOrgIdWithPage', EmployeeController.getEmployeeListByOrgIdWithPage);

router.post('/', upload.single('photo'), EmployeeController.saveEmployee);

router.put('/', EmployeeController.updateEmployee);

router.get('/', EmployeeController.getEmployeeDetailsId);

router.get('/checkEmailIdOfEmployee', EmployeeController.checkEmailIdOfEmployee);

router.get('/getEmployeeListByOrgId', EmployeeController.getEmployeeListByOrgId);

router.delete('/', EmployeeController.changeStatusOfEmployee);

module.exports = router;