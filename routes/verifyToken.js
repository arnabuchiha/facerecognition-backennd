const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('auth-token');

    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.send({success:false,msg:'Invalid Token'});
    }
}