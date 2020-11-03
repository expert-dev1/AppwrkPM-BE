const router = require('express').Router();
const OrganizationController = require('../../rest-controllers/organization-controller');

router.post('/getOrganizationListByOrgIdWithPage', OrganizationController.getOrganizationListByOrgIdWithPage);

router.post('/', OrganizationController.saveOrganization);

router.put('/', OrganizationController.updateOrganization);

router.get('/', OrganizationController.getOrganizationDetailsById);

router.get('/checkOrganizationCode', OrganizationController.checkOrganizationCode);

// router.get('/getEmployeeListByOrgId', OrganizationController.getEmployeeListByOrgId);

module.exports = router;