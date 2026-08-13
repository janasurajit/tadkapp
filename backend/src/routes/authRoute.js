const express = require('express')
const authControler = require('../controlers/authRouteControler.js')
const authMiddleware = require('../middlewares/authMiddleware.js')

const router = express.Router();

router.post("/register",authControler.register)
router.post("/login",authControler.login)
router.post("/logout",authControler.logout)

router.get("/getme",authMiddleware.tokenValid,authControler.getUser)

module.exports = router