const Sequelize = require('sequelize');

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Employee = require('./Employee');
const SkillMaster = require('../skill-master/SkillMaster');

const SkillEmployee = sequelize.define('skill_employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

SkillEmployee.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
SkillEmployee.belongsTo(Employee, {
    allowNull: false,
    onDelete: 'restrict'
});
SkillEmployee.belongsTo(SkillMaster, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = SkillEmployee;