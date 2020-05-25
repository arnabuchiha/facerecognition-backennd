const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.send({success:false,msg:'Invalid Token'});
    }
}