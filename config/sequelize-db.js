// const dbConfig = require("./db.config");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// module.exports = sequelize;


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
        host: 'localhost'
    } 
); 
  
// Exporting the sequelize object.  
// We can use it in another file 
// for creating models 
module.exports = sequelize 