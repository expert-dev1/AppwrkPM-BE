const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");
const Organization = require('../organization/Organization');
const Country = require('../seed-data/Country');
const State = require('../seed-data/State');
const City = require('../seed-data/City');
const Designation = require('../designation/Designation');

const Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imagePath: { type: Sequelize.STRING },
    empCode: { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING(50), allowNull: false },
    middleName: { type: Sequelize.STRING(50) },
    lastName: { type: Sequelize.STRING(50), allowNull: false },
    emailId: { type: Sequelize.STRING(50), allowNull: false },
    mobileNumber: { type: Sequelize.STRING(10), allowNull: false },
    status: { type: Sequelize.STRING(50), allowNull: false },
    dateOfJoining: { type: Sequelize.DATE, allowNull: false },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false},
    currentAddressLine1: { type: Sequelize.STRING(200), allowNull: false },
    currentAddressLine2: { type: Sequelize.STRING(200) },
    currentCountry: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    currentState: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: 'id'
        }
    },
    currentCity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'id'
        }
    },
    currentPincode: { type: Sequelize.INTEGER(6), allowNull: false },
    permanentAddressLine1: { type: Sequelize.STRING(200), allowNull: false },
    permanentAddressLine2: { type: Sequelize.STRING(200) },
    permanentCountry: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    permanentState: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: State,
            key: 'id'
        }
    },
    permanentCity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: City,
            key: 'id'
        }
    },
    permanentPincode: { type: Sequelize.INTEGER(6), allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      }
});

// Employee.hasOne(Organization, { foreignKey: 'organizations' });
Employee.belongsTo(Organization, {
    allowNull: false,
    onDelete: 'restrict'
});
Employee.belongsTo(Designation, {
    allowNull: false,
    onDelete: 'restrict'
});

module.exports = Employee;