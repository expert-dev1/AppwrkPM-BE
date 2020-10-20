const Sequelize = require('sequelize') 

// const { DataTypes } = require("sequelize/types");
const sequelize = require("../../config/sequelize-db");


// Import sequelize object,  
// Database connection pool managed by Sequelize. 

// Define method takes two arrguments 
// 1st - name of table 
// 2nd - columns inside the table 
const Organization = sequelize.define('organization', { 

    // Column-1, id is an object with  
    // properties like type, keys,  
    // validation of column. 
    id:{ 

        // Sequelize module has INTEGER Data_Type. 
        type:Sequelize.INTEGER, 

        // To increment user_id automatically. 
        autoIncrement:true, 

        // user_id can not be null. 
        allowNull:false, 

        // For uniquely identify user. 
        primaryKey:true
    }, 

    // Column-2, name 
    orgName: { type: Sequelize.STRING(50), allowNull:false }, 

    // Column-3, description 
    orgCode: { type: Sequelize.STRING(50), allowNull: false }, 
    status: { type: Sequelize.STRING(50), allowNull: false }, 

    // Column-4, default values for 
    // dates => current time 

     // Timestamps 
     createdAt: Sequelize.DATE, 
     updatedAt: Sequelize.DATE, 
});

// Exporting RoleMaster, using this constant 
// we can perform CRUD operations on 
// 'role_master' table. 
module.exports = Organization