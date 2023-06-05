const jwt=require("jsonwebtoken");
require('dotenv').config()
const auth=(req,res,next)=>{;
    try{
        let token=req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user=jwt.verify(token,process.env.SECRECT);
            req.userId=user.id;
        }
        else{
            return res.status(401).json({message:" token error"})
        }
        
        next()
    }
    catch(err){
        return res.status(401).json({message:"Unauthorize User"})
    }
}
module.exports=auth