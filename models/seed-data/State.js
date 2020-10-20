const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Country = require('../seed-data/Country');

const State = sequelize.define('state', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    country: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = State;