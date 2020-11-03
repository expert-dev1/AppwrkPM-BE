const Sequelize = require('sequelize');
const Organization = require('../organization/Organization');
const Project = require('../project/Project');
const sequelize = require("../../config/sequelize-db");
const Client = sequelize.define('client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(50), allowNull: false },
    altEmail: { type: Sequelize.STRING(50) },
    skypeId: { type: Sequelize.STRING(50) },
    moreInfo: { type: Sequelize.TEXT },
    // project type
    createdAt: Sequelize.DATE,
    createdBy: { type: Sequelize.STRING(100), allowNull: false },
    updatedAt: Sequelize.DATE,
    updatedBy: { type: Sequelize.STRING(100), allowNull: false },
});

Client.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
Client.belongsTo(Project, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = Client;