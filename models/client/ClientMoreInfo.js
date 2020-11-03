const Sequelize = require('sequelize');
const Organization = require('../organization/Organization');
const Client = require('../client/Client');
const sequelize = require("../../config/sequelize-db");
const ClientMoreInfo = sequelize.define('client_more_info', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    key: { type: Sequelize.STRING(50), allowNull: false },
    value: { type: Sequelize.STRING(50), allowNull: false },
    createdAt: Sequelize.DATE,
    createdBy: { type: Sequelize.STRING(100), allowNull: false },
    updatedAt: Sequelize.DATE,
    updatedBy: { type: Sequelize.STRING(100), allowNull: false },
});

ClientMoreInfo.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
ClientMoreInfo.belongsTo(Client, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = ClientMoreInfo;