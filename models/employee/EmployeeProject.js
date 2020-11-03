const Sequelize = require('sequelize');

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Employee = require('../employee/Employee');
const Project = require('../project/Project');

const EmployeeProject = sequelize.define('employee_project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    checkInDate: { type: Sequelize.DATE, allowNull: false },
    checkOutDate: { type: Sequelize.DATE },
    createdAt: Sequelize.DATE,
    createdBy: { type: Sequelize.STRING(100), allowNull: false },
    updatedAt: Sequelize.DATE,
    updatedBy: { type: Sequelize.STRING(100), allowNull: false },
});
EmployeeProject.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
EmployeeProject.belongsTo(Employee, {
    allowNull: false,
    onDelete: 'restrict'
});
EmployeeProject.belongsTo(Project, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = EmployeeProject;