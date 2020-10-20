const Sequelize = require('sequelize');

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");

const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    iso: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING(50), allowNull: false },
    nicename: { type: Sequelize.STRING(50) },
    iso3: { type: Sequelize.STRING(50) },
    numcode: { type: Sequelize.STRING(50) },
    phonecode: { type: Sequelize.STRING(50) },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Country;