const Sequelize = require('sequelize');

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Employee = require('../employee/Employee');
const RoleMaster = require('../role-master/RoleMaster');

const RoleEmployee = sequelize.define('role_employee', {
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
RoleEmployee.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
RoleEmployee.belongsTo(Employee, {
    allowNull: false,
    onDelete: 'restrict'
});
RoleEmployee.belongsTo(RoleMaster, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = RoleEmployee;