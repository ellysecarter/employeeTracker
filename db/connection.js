const mysql = require("mysql2");

// require('dotenv').config();

// create connection to our db
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "type in your password here",
    database: "employee"
  });
  
  connection.connect(err => 
    {if (err) {
      throw err
    }})

  module.exports = connection;