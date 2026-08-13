const jwt = require('jsonwebtoken')

async function tokenValid(req,res,next) {
    try{
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({
            massage: "invalid token"
        })
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded){
         return res.status(404).json({
            massage: "invalid token"
        })
    }

    req.id = decoded.id;
    next()

}
catch(err){
    console.log(err);
    
}
}

module.exports = { tokenValid}