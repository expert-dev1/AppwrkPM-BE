const router = require('express').Router();
const OrganizationCalendarController = require('../../rest-controllers/organization-calendar-controller');

router.post('/', OrganizationCalendarController.saveOrganizationEvents);

router.put('/', OrganizationCalendarController.updateOrganizationEvents);

router.get('/', OrganizationCalendarController.getOrganizationEventsById);

router.get('/getEventsAndHolidaysListForOrganizationCalendar', OrganizationCalendarController.getEventsAndHolidaysListForOrganizationCalendar);

router.delete('/', OrganizationCalendarController.deleteOrganizationEventsById);

module.exports = router;