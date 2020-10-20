const router = require('express').Router();
const DesignationController = require('../../rest-controllers/designation-controller');


router.post('/getDesignationListByOrgIdWithPage', DesignationController.getDesignationListByOrgIdWithPage);

router.post('/', DesignationController.saveDesignation);

router.put('/', DesignationController.updateDesignation);

router.get('/', DesignationController.getDesignationDetailsById);

router.delete('/', DesignationController.deleteDesignationById);

module.exports = router;