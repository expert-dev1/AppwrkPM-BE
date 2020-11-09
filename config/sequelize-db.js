// Include Sequelize module 
const Sequelize = require('sequelize') 
const {ENV,HOST,PASSWORD,PORT,USER} = require('./config');
// Creating new Object of Sequelize 
const sequelize = new Sequelize( 
    'project_management', 
    USER, 
    '', { 
        // Explicitly specifying  
        // mysql database 
        dialect: 'mysql', 
        // By default host is 'localhost'            
        host: HOST
    } 
); 
  
// Exporting the sequelize object.  
// We can use it in another file 
// for creating models 
module.exports = sequelize 