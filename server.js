const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const PlatformType = require('./models/seed-data/PlatformType');
const RoleEmployee = require('./models/employee/RoleEmployee');
const EmployeeProject = require('./models/employee/EmployeeProject');
const Project = require('./models/project/Project');
app.use(cors());
app.use(bodyParser.json());
app.use('/api', require('./routes/index'));

// DB Connection 

// Import the sequelize object on which 
// we have defined model. 
const sequelize = require('./config/sequelize-db');
  
console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);
// Import the user model we have defined 
  
// Create all the table defined using  
// sequelize in Database 
  
// Sync all models that are not 
// already in the database 
sequelize.sync();
// PlatformType.sync();
// RoleEmployee.sync();
// Project.sync();
// EmployeeProject.sync();
sequelize.sync().then(result => {
    // console.log(result)
    // console.log(result);
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
}).catch(err => {
    // console.log(err);
});

  
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards
// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });