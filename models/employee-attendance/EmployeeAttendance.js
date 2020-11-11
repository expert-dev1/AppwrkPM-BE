const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Employee = require('../employee/Employee');
const { DataTypes } = require("sequelize");

const EmployeeAttendance = sequelize.define('employee_attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    checkInDate: { type: Sequelize.DATE, allowNull: false },
    checkOutDate: { type: Sequelize.DATE },
    status: { type: Sequelize.STRING, allowNull: false },
    breakTimeInMin: { type: Sequelize.STRING },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    totalTime: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.checkInDate && this.checkInDate != undefined && this.checkInDate != null
                && this.checkOutDate && this.checkOutDate != undefined && this.checkOutDate != null) {
                var checkInDateTime = new Date(`${this.checkInDate}`);
                var checkOutDateTime = new Date(`${this.checkOutDate}`);
                var diffMs = (checkOutDateTime - checkInDateTime); // milliseconds
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                var eventDuration = diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes";
                return eventDuration;
            } else {
                return "0 days, 0 hours, 0 minutes";
            }
        },
    }
});

EmployeeAttendance.belongsTo(Employee, {
    allowNull: false,
    onDelete: 'restrict'
});

EmployeeAttendance.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = EmployeeAttendance;