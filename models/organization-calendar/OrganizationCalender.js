const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');

const OrganizationCalendar = sequelize.define('organization_calendar', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    eventFor: { type: Sequelize.STRING(100), allowNull: false },
    celebrationFor: { type: Sequelize.STRING(200), allowNull: false },
    dateOfEvent: { type: Sequelize.DATE, allowNull: false },
    startTime: { type: Sequelize.TIME, allowNull: false },
    endTime: { type: Sequelize.TIME, allowNull: false },
    eventDuration: { type: Sequelize.STRING, allowNull: false },
    employeeStrengthInEvent: { type: Sequelize.STRING, allowNull: false },
    venueOfEvent: { type: Sequelize.STRING(200), allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});


OrganizationCalendar.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = OrganizationCalendar;