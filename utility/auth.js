const jwt = require('jsonwebtoken');
 module.exports = (req, res, next) => {
     try{
        //  console.log("HEADERS  ====== " , req.headers);
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, 'secret');
        req.userdata = decode;
        next();
        // if(decode.email == req.body.email)
        // {
        //     next();
        // }
       
     }catch(error){
         console.log('Something Wents Wrongs OR Invalid Token...', error);
     }
 }




//  jdksjkfajkjkkajakj