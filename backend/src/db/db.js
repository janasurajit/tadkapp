const mysql = require('mysql2/promise');


const  urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
console.log(urlDB)
const mysqlpool = mysql.createPool(urlDB)


module.exports = mysqlpool