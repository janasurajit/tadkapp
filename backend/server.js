require('dotenv').config()
const app = require("./src/app.js")
const mysqlpool = require("./src/db/db.js")

const PORT = process.env.PORT


mysqlpool.query(`SELECT 1`).then(()=>{

    console.log("database connected sucessfully");
    
    app.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
})
})