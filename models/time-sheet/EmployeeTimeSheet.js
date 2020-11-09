const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Project = require('../project/Project');
const Employee = require('../employee/Employee');

const EmployeeTimeSheet = sequelize.define('employee_time_sheet', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    taskName: { type: Sequelize.TEXT, allowNull: false },
    attachment: {type: Sequelize.TEXT},
    taskDescription: { type: Sequelize.TEXT, allowNull: false },
    taskDate: { type: Sequelize.DATE, allowNull: false },
    numberOfHours: { type: Sequelize.STRING, allowNull: false },
    isApproved: {type: Sequelize.BOOLEAN, allowNull: false},
    isRejected: {type: Sequelize.BOOLEAN, allowNull: false},
    isPending: {type: Sequelize.BOOLEAN, allowNull: false},
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    createdBy: {type: Sequelize.STRING, allowNull: false},
    updatedBy: {type: Sequelize.STRING, allowNull: false},
    hoursInMinutes: {
        type: DataTypes.VIRTUAL,
        get() {
            var removedDotsString = `${this.numberOfHours}`.split(":");
            var minutes = parseInt(removedDotsString[0]) * 60 + parseInt(removedDotsString[1]); //1111
            return minutes;
        },
    }
});

EmployeeTimeSheet.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});

EmployeeTimeSheet.belongsTo(Project, {
    allowNull: false,
    onDelete: 'restrict'
});

EmployeeTimeSheet.belongsTo(Employee, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = EmployeeTimeSheet;