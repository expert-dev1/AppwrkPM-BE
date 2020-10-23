const router = require('express').Router();
const { validateToken } = require('../../common-utils/validate-token');
const RoleMasterController = require('../../rest-controllers/role-master-controller');


router.post('/getRoleMasterListByOrgIdWithPage', RoleMasterController.getRoleMasterListByOrgIdWithPage);

router.post('/', RoleMasterController.saveRoleMaster);

router.put('/', RoleMasterController.updateRoleMaster);

router.get('/', RoleMasterController.getRoleMasterDeatilsById);

router.get('/getRoleMasterListByOrgId', RoleMasterController.getRoleMasterListByOrgId);

router.delete('/', RoleMasterController.deleteRoleMasterById);

module.exports = router;