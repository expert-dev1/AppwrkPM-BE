const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const RoleEmployee = require('./models/employee/RoleEmployee');
app.use(cors());
app.use(bodyParser.json());
app.use('/api', require('./routes/index'));

// DB Connection 

// Import the sequelize object on which 
// we have defined model. 
const sequelize = require('./config/sequelize-db');
  
// Import the user model we have defined 
  
// Create all the table defined using  
// sequelize in Database 
  
// Sync all models that are not 
// already in the database 
// sequelize.sync();

sequelize.sync().then(result => {
    // console.log(result);
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
}).catch(err => {
    console.log(err);
});

  
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards
// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });