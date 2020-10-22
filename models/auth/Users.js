const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Employee = require('../employee/Employee');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    salt: { type: Sequelize.STRING, allowNull: false },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false },
    isLoggedIn: { type: Sequelize.BOOLEAN, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

User.belongsTo(Organization);
User.belongsTo(Employee);

module.exports = User;