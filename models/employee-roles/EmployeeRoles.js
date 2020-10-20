const Sequelize = require('sequelize');
const sequelize = require('./config/sequelize-db');
// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const RoleMaster = require('../role-master/RoleMaster');
const Employee = require('../employee/Employee');

const EmployeeRolesMapping = sequelize.define('employee_roles_mappings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

EmployeeRolesMapping.belongsTo(Organization);
EmployeeRolesMapping.belongsTo(Employee);
EmployeeRolesMapping.belongsTo(RoleMaster);
// sequelize.sync();
module.exports = EmployeeRolesMapping;