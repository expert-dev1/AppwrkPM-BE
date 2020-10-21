// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'admin@123',
//     database: 'project_management'
// })

// connection.connect(function(error) {
//     if (error) {
//         throw error
//     }
//     console.log('MySQL Connection Established.');
// })
// exports.connection = connection;


module.exports = {
    HOST: "127.0.0.1",    
    PORT: "3306",
    USER: "root",
    PASSWORD: "admin@123",
    DB: "project_management",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };