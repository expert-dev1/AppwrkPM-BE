const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const State = require('../seed-data/State');

const City = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(50), allowNull: false },
    state: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: State,
            key: 'id'
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = City;