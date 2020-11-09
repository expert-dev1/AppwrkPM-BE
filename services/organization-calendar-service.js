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
        //     var organizationCalenderList = [];
        //     await OrganizationCalender.findAndCountAll({
        //         where: { organizationId: req.employee.organizationId },
        //         group: ['dateOfEvent'],
        //         attributes: ['dateOfEvent', 'eventFor'],
        //     }).then(data => {const list = {
        //         dateOfEvent: data.row,
        //         count: data.count
        //     }
        //     organizationCalenderList = list;
        // });
        // return organizationCalenderList;
    }

    static async deleteOrganizationEventsById(req) {

    }
}

module.exports = OrganizationCalendarService;