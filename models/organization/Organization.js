const Sequelize = require('sequelize')

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Country = require('../seed-data/Country');
const State = require('../seed-data/State');
const City = require('../seed-data/City');

const Organization = sequelize.define('organization', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orgName: { type: Sequelize.STRING(50), allowNull: false },
    orgCode: { type: Sequelize.STRING(50), allowNull: false },
    status: { type: Sequelize.STRING(50), allowNull: false },
    emailId: { type: Sequelize.STRING(50), allowNull: false },
    mobileNumber: { type: Sequelize.STRING(10), allowNull: false },
    addressLine1: { type: Sequelize.STRING(200), allowNull: false },
    addressLine2: { type: Sequelize.STRING(200) },
    country: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: 'id'
        }
    },
    city: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'id'
        }
    },
    pincode: { type: Sequelize.INTEGER(6), allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});


module.exports = Organization