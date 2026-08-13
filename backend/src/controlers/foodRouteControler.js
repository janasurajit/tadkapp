const db = require('../db/db.js')
const {uploadFile} = require('../services/storage.service.js')

async function addFood(req,res){
    const {FNAME,FDESC,CATEGORY,PRICE}= req.body
    const IMAGE = req.file

    if(!{FNAME} || !{FDESC} || !{CATEGORY} || !{PRICE} || !{IMAGE}){
        return res.status(400).json({message:"Please provide all required fields"})
    }

     const result = await uploadFile(IMAGE.buffer.toString("base64"));    

    const [newFood] = await db.query("INSERT INTO FOODS (FNAME,FDESC,CATAGORY,PRICE,F_URI) VALUES (?,?,?,?,?) ",[FNAME,FDESC,CATEGORY,PRICE,result.url])
    const data = newFood.insertId
    res.status(201).json({
        message:"Food added successfully",
        data:data
    })
}

async function getAllFoods(req,res){
    const [foods] = await db.query("SELECT * FROM FOODS")
    res.status(200).json({
        message:"Foods retrieved successfully",
        data:foods
    })
}

async function getFoodById(req,res){
    const {id} = req.params
    const [food] = await db.query("SELECT * FROM FOODS WHERE FID = ?",[id])

    if(!food.length){
        return res.status(404).json({message:"Food not found"})
    }

    res.status(200).json({
        message:"Food retrieved successfully",
        data:food
    })
}

async function updateFood(req,res){
    const {id} = req.params
    const {FNAME,FDESC,CATEGORY,PRICE}= req.body
    const IMAGE = req.file
    console.log(req.body)
    console.log(req.file)
    console.log(id)
    if(!{FNAME} || !{FDESC} || !{CATEGORY} || !{PRICE} || !{IMAGE}){
        return res.status(400).json({message:"Please provide all required fields"})
    }
        
    const [food] = await db.query("SELECT * FROM FOODS WHERE FID = ?",[id])


     if(!food.length){
        return res.status(404).json({message:"Food not found"})
    }

     const result = await uploadFile(IMAGE.buffer.toString("base64"));   

    const [updatedFood] = await db.query("UPDATE FOODS SET FNAME = ?, FDESC = ?, CATAGORY = ?, PRICE = ?, F_URI = ? WHERE FID = ? ",[FNAME,FDESC,CATEGORY,PRICE,result.url,id])


    res.status(200).json({
        message:"Food updated successfully",
        data:updatedFood
    })
}

async function deleteFood(req,res){
    const {id} = req.params
    const [food] = await db.query("SELECT * FROM FOODS WHERE FID = ?",[id])


     if(!food.length){
        return res.status(404).json({message:"Food not found"})
    }
    const [deletedFood] = await db.query("DELETE FROM FOODS WHERE FID = ? ",[id])
    res.status(200).json({
        message:"Food deleted successfully"
    })
}

module.exports = {
    addFood,
    getAllFoods,
    getFoodById,
    updateFood,
    deleteFood
}
   