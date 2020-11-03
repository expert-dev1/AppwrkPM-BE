const router = require('express').Router();
const {validateToken} = require('../../common-utils/validate-token');
const AuthController = require('../../rest-controllers/auth-controller');


router.post('/login', AuthController.login);

router.post('/getRefreshToken', AuthController.getRefreshToken);

router.get('/logout', AuthController.logout);

router.use('/', validateToken);

router.post('/changePassword', AuthController.changePassword);

// router.put('/', DesignationController.updateDesignation);

// router.get('/', DesignationController.getDesignationDetailsById);

// router.delete('/', DesignationController.deleteDesignationById);

// router.get('/getDesignationListByOrgId', DesignationController.getDesignationListByOrgId);

module.exports = router;