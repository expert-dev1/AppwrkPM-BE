// const { where } = require('sequelize/types');
const OrganizationCalender = require('../models/organization-calendar/OrganizationCalender');
// const sequelize = require('../config/sequelize-db');
const ConstantUtils = require("../common-utils/ConstantUtils");
const { Op } = require("sequelize");

class OrganizationCalendarService {

    static async saveOrganizationEvents(req) {
        var organizationCalender = {
            eventFor: req.body.eventFor,
            celebrationFor: req.body.celebrationFor,
            dateOfEvent: req.body.dateOfEvent,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
            eventDuration: req.body.eventDuration,
            employeeStrengthInEvent: req.body.employeeStrengthInEvent,
            venueOfEvent: req.body.venueOfEvent,
            organizationId: req.employee.organizationId
        };
        var duplicateRowsCount = await OrganizationCalender.findAndCountAll({ where: { eventFor: organizationCalender.eventFor, celebrationFor: organizationCalender.celebrationFor, organizationId: organizationCalender.organizationId } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var newOrganizationCalender = await OrganizationCalender.create(organizationCalender).then(data => newOrganizationCalender = data).catch(err => { console.log('err : ', err) });
            return newOrganizationCalender;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async updateOrganizationEvents(req) {
        var organizationEventsId = req.body.id;
        console.log('Req Body : ', req.body);
        var organizationCalender = {
            eventFor: req.body.eventFor,
            celebrationFor: req.body.celebrationFor,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
            eventDuration: req.body.eventDuration,
            employeeStrengthInEvent: req.body.employeeStrengthInEvent,
            venueOfEvent: req.body.venueOfEvent,
        };
        var duplicateRowsCount = await OrganizationCalender.findAndCountAll({ where: { eventFor: organizationCalender.eventFor, celebrationFor: organizationCalender.celebrationFor, organizationId: req.employee.organizationId, id: { [Op.ne]: organizationEventsId } } }).then(data => duplicateRowsCount = data.count).catch(error => console.log('error in checking duplicate records : ', error));
        console.log('Duplicate Rows Count : ', duplicateRowsCount);
        if (duplicateRowsCount != null && duplicateRowsCount == 0) {
            var updatedOrganizationCalender = await OrganizationCalender.update(organizationCalender, { where: { id: organizationEventsId } })
                .then(numberOfRowsAffected => updatedOrganizationCalender = numberOfRowsAffected).catch(err => { console.log('err : ', err) });
            return updatedOrganizationCalender;
        } else {
            throw new Error(ConstantUtils.RECORD_ALREADY_EXISTS);
        }
    }

    static async getOrganizationEventsById(req) {
        var organizationCalender = await OrganizationCalender.findByPk(req.query.orgCalId).then(data => organizationCalender = data);
        return organizationCalender;
    }

    static async getEventsAndHolidaysListForOrganizationCalendar(req) {
        var organizationCalenderList = await OrganizationCalender.findAll({
            where: { organizationId: req.employee.organizationId },
        }).then(data => organizationCalenderList = data);
        return organizationCalenderList;
    }

    static async deleteOrganizationEventsById(req) {
        var organizationCalender = await OrganizationCalender.destroy({
            where: {
                id: req.query.orgCalId
            }
        }).then(data => organizationCalender = data).catch(err => { throw new Error(err) });
        return organizationCalender;
    }
}

module.exports = OrganizationCalendarService;