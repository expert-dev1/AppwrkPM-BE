const {validateToken} = require('../common-utils/validate-token');

const router = require('express').Router();


router.use('/auth', require('./api/auth-routes'));

router.use('/', validateToken);

router.use('/roleMaster', require('./api/role-master-routes'));

router.use('/employee', require('./api/employee-routes'));

router.use('/seedData', require('./api/seed-data-routes'));

router.use('/designation', require('./api/designation-routes'));

router.use('/projects', require('./api/project-routes'));

router.use('/organization', require('./api/organization-routes'));

router.use('/organizationCalendar', require('./api/organization-calendar-routes'));

router.use('/timeSheet', require('./api/time-sheet-routes'));

module.exports = router;