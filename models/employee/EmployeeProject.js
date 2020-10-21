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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});
// Employee.belongsTo(Organization);
EmployeeProject.belongsTo(Organization);
EmployeeProject.belongsTo(Employee);
EmployeeProject.belongsTo(Project);

module.exports = EmployeeProject;