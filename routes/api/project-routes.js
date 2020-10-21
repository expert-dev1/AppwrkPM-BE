const router = require('express').Router();
const ProjectController = require('../../rest-controllers/project-controller');


router.post('/getProjectListByOrgIdWithPage', ProjectController.getProjectListByOrgIdWithPage);

router.post('/', ProjectController.saveProject);

router.put('/', ProjectController.updateProject);

router.get('/', ProjectController.getProjectDetailsId);

router.get('/checkIfProjectNameAlreadyExists', ProjectController.checkIfProjectNameAlreadyExists);

// router.get('/getEmployeeListByOrgId', ProjectController.getEmployeeListByOrgId);

module.exports = router;