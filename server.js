const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
// const SkillEmployee = require('./models/employee/SkillEmployee');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('./routes/index'));
// make public to the storage folder
app.use('/storage', express.static('storage'));

app.get('/api/', (req, res)=>{
    res.send('Hello world');
});

const sequelize = require('./config/sequelize-db');
  
// console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your port is ${process.env.PORT}`);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// SkillEmployee.sync();
// sequelize.sync().then(result => {
//     // console.log(result);
   
// }).catch(err => {
//     console.log(err);
// });