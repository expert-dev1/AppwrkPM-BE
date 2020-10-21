// Include Sequelize module 
const Sequelize = require('sequelize') 
  
// Creating new Object of Sequelize 
const sequelize = new Sequelize( 
    'project_management', 
    'root', 
    'admin@123', { 
  
        // Explicitly specifying  
        // mysql database 
        dialect: 'mysql', 
  
        // By default host is 'localhost'            
        host: '127.0.0.1'
    } 
); 
  
// Exporting the sequelize object.  
// We can use it in another file 
// for creating models 
module.exports = sequelize 