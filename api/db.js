const mysql = require("mysql")

const db = mysql.createConnection({
  hostname: "localhost",
  port: 3306,
  database: "blogs",
  user: "root",
  password: "Mulu2835..",
});

module.exports = db;