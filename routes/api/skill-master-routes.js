const router = require('express').Router();
const SkillMasterController = require('../../rest-controllers/skill-master-controller');


router.post('/getSkillMasterListByOrgIdWithPage', SkillMasterController.getSkillMasterListByOrgIdWithPage);

router.post('/', SkillMasterController.saveSkillMaster);

router.put('/', SkillMasterController.updateSkillMaster);

router.get('/', SkillMasterController.getSkillMasterDeatilsById);

router.delete('/', SkillMasterController.deleteSkillMasterById);

router.get('/getSkillMasterListByOrgId', SkillMasterController.getSkillMasterListByOrgId);

module.exports = router;