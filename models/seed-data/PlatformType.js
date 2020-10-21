const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");

const PlatformType = sequelize.define('platform_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    description: { type: Sequelize.STRING(200), allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});


module.exports = PlatformType;