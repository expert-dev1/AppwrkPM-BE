const Sequelize = require('sequelize');

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Country = require('../seed-data/Country');
const State = require('../seed-data/State');
const City = require('../seed-data/City');
const RoleMaster = require('../role-master/RoleMaster');

const Employee = sequelize.define('employee', {
    id:{ 
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 

    empCode: { type: Sequelize.STRING, allowNull:false },
    firstName: { type: Sequelize.STRING(50), allowNull:false }, 
    middleName: { type: Sequelize.STRING(50) }, 
    lastName: { type: Sequelize.STRING(50), allowNull:false }, 
    emailId: { type: Sequelize.STRING(50), allowNull:false },
    mobileNumber: { type: Sequelize.STRING(10), allowNull:false }, 
    status: { type: Sequelize.STRING(50), allowNull:false },
    dateOfJoining: { type: Sequelize.DATE, allowNull:false },
    addressLine1: { type: Sequelize.STRING(200), allowNull:false },
    addressLine2: { type: Sequelize.STRING(200) },
    roleMaster: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: RoleMaster,
            key: 'id'
        }
    },
    // organization: {
    //     type: Sequelize.INTEGER,
    //     allowNull:false,
    //     references: {
    //         model: Organization,
    //         key: 'id'
    //     }
    // },
    country: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: State,
            key: 'id'
        }
    },
    city: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
            model: City,
            key: 'id'
        }
    },
    pincode: { type: Sequelize.INTEGER(6), allowNull:false }, 
     createdAt: Sequelize.DATE, 
     updatedAt: Sequelize.DATE, 
});

// Employee.hasOne(Organization, { foreignKey: 'organizations' });
Employee.belongsTo(Organization);

module.exports = Employee;