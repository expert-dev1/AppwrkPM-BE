const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');

const SkillMaster = sequelize.define('skill_master', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

SkillMaster.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = SkillMaster;