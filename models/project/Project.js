const Sequelize = require('sequelize');
const Organization = require('../organization/Organization');
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
    startDate: { type: Sequelize.DATE, allowNull: false },
    endDate: { type: Sequelize.DATE },
    timeType: { type: Sequelize.STRING, allowNull: false },
    amount: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING(50), allowNull: false },
    // project type
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

Project.belongsTo(Organization);
Project.belongsTo(PlatformType);

module.exports = Project;