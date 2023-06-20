const jwt = require('jsonwebtoken');
const User =require('../Models/users')
 module.exports = async (req, res, next) => {
     try{
        //  console.log("HEADERS  ====== " , req.headers);
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, 'secret');
        const user = await User.findOne({_id: decode.id})
        req.user = user;
        next();
       
     }catch(error){
        res.status(401).json({
            message:"invalid token"
        })
     }
 }




//  jdksjkfajkjkkajakj