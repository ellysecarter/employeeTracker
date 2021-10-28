const Sequelize = require('sequelize');
const mysql = require("mysql");

// require('dotenv').config();

// create connection to our db
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee"
  });
  
  connection.connect();

  module.exports = connection;