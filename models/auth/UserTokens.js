const Sequelize = require('sequelize');
const sequelize = require("../../config/sequelize-db");
const Users = require('../auth/Users');

const UserTokens = sequelize.define('user_tokens', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    jwtToken: { type: Sequelize.STRING, allowNull: false },
    refershToken: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

UserTokens.belongsTo(Users);

module.exports = UserTokens;