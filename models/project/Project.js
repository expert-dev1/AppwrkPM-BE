const Sequelize = require('sequelize');
const Organization = require('../organization/Organization');
const Employee = require('../employee/Employee');
const PlatformType = require('../seed-data/PlatformType');
const sequelize = require("../../config/sequelize-db");
const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    startDate: { type: Sequelize.DATE, allowNull: false },
    endDate: { type: Sequelize.DATE },
    timeType: { type: Sequelize.STRING, allowNull: false },
    amount: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING(50), allowNull: false },
    // project type
    createdAt: Sequelize.DATE,
    createdBy: { type: Sequelize.STRING(100), allowNull: false },
    updatedBy: { type: Sequelize.STRING(100), allowNull: false },
    updatedAt: Sequelize.DATE,
});

Project.belongsTo(Employee, {
    allowNull: false,
    as: 'inCharge',
    onDelete: 'restrict'
});

Project.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
Project.belongsTo(PlatformType, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = Project;