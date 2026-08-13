const bcrypt = require('bcryptjs')
const db = require('../db/db.js')
const jwt = require('jsonwebtoken')

async function register(req,res) {
    const {USERNAME,EMAIL,PASS} = req.body;

    if(!USERNAME||!EMAIL||!PASS){
        return res.status(404).json({
            massage: "invalid input"
        }) 
    }

    const [rows] = await db.query(`SELECT UID FROM USERS WHERE EMAIL=?`,[EMAIL])
    
    if(rows.length>0){
          return res.status(409).json({
            massage: "user already register",
          
        })
    }

    const hash = await bcrypt.hash(PASS,10);

    const user = await db.query(`INSERT INTO USERS (USERNAME,EMAIL,PASS) VALUES (?,?,?)`,[USERNAME,EMAIL,hash])
    const uid = await db.query(`SELECT UID FROM USERS WHERE EMAIL=?`,[EMAIL])
    const id = uid[0];

    const token = jwt.sign({ 
        id:id[0].UID,
    },process.env.JWT_SECRET)

res.cookie("token",token,{
    maxAge: '900000',
    httpOnly: true,
    secure: true,
    sameSite: 'none'
})

res.status(201).json({
    massage: "user created sucessfully",
   
})
} 

async function login(req,res) {
    
    const {EMAIL,PASS} = req.body;
    if(!EMAIL || !PASS){
        return res.status(404).json({
            massage: "Invalid data"
        })
    }

     const [rows] = await db.query(`SELECT UID FROM USERS WHERE EMAIL=?`,[EMAIL])
    
    if(rows.length == 0){
          return res.status(404).json({
            massage: "user not found",
          
        })
    }

    const data= await db.query( `SELECT PASS FROM USERS WHERE EMAIL=?`,[EMAIL])
    const hash= data[0]
    
    const validPass = await bcrypt.compare(PASS,hash[0].PASS);
    if(!validPass){
        return res.status(401).json({
            massage: "wrong password",
          
        })
    }  

    const uid = await db.query(`SELECT UID FROM USERS WHERE EMAIL=?`,[EMAIL])
    const id = uid[0];

    const token = jwt.sign({ 
        id:id[0].UID,
    },process.env.JWT_SECRET)

res.cookie("token",token,{
    maxAge: '900000',
    httpOnly: true,
    secure: true,
    sameSite: 'none'
})

res.status(200).json({
    massage: "user logged sucessfully",
   
})
    

}

async function logout(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        massage: "user logged out sucessfully",
    })
}

async function getUser(req,res) {
    const id = req.id;
    if(!id){
        return res.status(404).json({
            massage: "id not found"
        })
    }

    const data = await db.query(`SELECT * FROM USERS WHERE UID=?`,[id])
    const user = data[0]
    res.status(200).json({
        massage: "user found",
        user: {
            id: user[0].UID,
            username: user[0].USERNAME,
            email: user[0].EMAIL
        }
    })
}

module.exports = {register,login,logout,getUser}