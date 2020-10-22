const router = require('express').Router();
const OrganizationController = require('../../rest-controllers/organization-controller');

router.post('/getOrganizationListByOrgIdWithPage', OrganizationController.getOrganizationListByOrgIdWithPage);

// router.post('/', OrganizationController.saveOrganization);

// router.put('/', OrganizationController.updateOrganization);

// router.get('/', OrganizationController.getEmployeeDetailsId);

// router.get('/checkEmailIdOfEmployee', OrganizationController.checkEmailIdOfEmployee);

// router.get('/getEmployeeListByOrgId', OrganizationController.getEmployeeListByOrgId);

module.exports = router;