const router = require('express').Router();
const ProjectController = require('../../rest-controllers/project-controller');


router.post('/getProjectListByOrgIdWithPage', ProjectController.getProjectListByOrgIdWithPage);

router.post('/', ProjectController.saveProjectDTO);

router.put('/', ProjectController.updateProjectDTO);

router.get('/', ProjectController.getProjectDetailsById);

router.get('/checkIfProjectNameAlreadyExists', ProjectController.checkIfProjectNameAlreadyExists);

router.delete('/deleteClientMoreInfoById', ProjectController.deleteClientMoreInfoById);

router.delete('/deleteEmployeeProjectById', ProjectController.deleteEmployeeProjectById);

router.get('/getProjectListByOrgIdAndLoggedInEmployeeId', ProjectController.getProjectListByOrgIdAndLoggedInEmployeeId);

module.exports = router;