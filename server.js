const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
// const Client = require('./models/client/Client');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('./routes/index'));

const sequelize = require('./config/sequelize-db');
  
console.log(`Your port is ${process.env.PORT}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`);

// Client.sync();
sequelize.sync().then(result => {
    // console.log(result);
    app.listen(PORT, function() {
        console.log("Server is running on Port: " + PORT);
    });
}).catch(err => {
    console.log(err);
});