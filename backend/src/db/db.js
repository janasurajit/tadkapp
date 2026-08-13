const mysql = require('mysql2/promise');

console.log(process.env.MYSQLHOST)

const mysqlpool = mysql.createPool({
host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT || 3306,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
})


module.exports = mysqlpool