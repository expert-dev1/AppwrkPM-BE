const router = require('express').Router();
const AuthController = require('../../rest-controllers/auth-controller');


router.post('/login', AuthController.login);

// router.post('/', DesignationController.saveDesignation);

// router.put('/', DesignationController.updateDesignation);

// router.get('/', DesignationController.getDesignationDetailsById);

// router.delete('/', DesignationController.deleteDesignationById);

// router.get('/getDesignationListByOrgId', DesignationController.getDesignationListByOrgId);

module.exports = router;