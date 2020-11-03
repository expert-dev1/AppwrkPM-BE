const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");

const MoreInformation = sequelize.define('more_information', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false, unique: true, },
    description: { type: Sequelize.STRING(200) },
    labelName: { type: Sequelize.STRING(50), allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = MoreInformation;