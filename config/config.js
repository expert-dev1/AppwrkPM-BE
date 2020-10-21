// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
};