const express = require('express');
const foodRouteControler = require('../controlers/foodRouteControler.js')
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware.js')

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

    router.post("/addfood", authMiddleware.tokenValid, upload.single('IMAGE'), foodRouteControler.addFood)



    router.get("/getallfoods",foodRouteControler.getAllFoods)
    router.get("/getfoodbyid/:id",foodRouteControler.getFoodById)


    router.put("/updatefood/:id", authMiddleware.tokenValid, upload.single('IMAGE'), foodRouteControler.updateFood)

    router.delete("/deletefood/:id", authMiddleware.tokenValid,foodRouteControler.deleteFood)







module.exports = router;