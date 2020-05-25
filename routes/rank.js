const router=require('express').Router();
const verify=require('./verifyToken');
const User=require('../model/User');
router.get('/',verify,async (req,res)=>{
    const user=await User.findOne({_id:req.user._id});
    res.json({success:true,rank:user.rank})
})
router.post('/',verify,async(req,res)=>{
    const user=await User.findOne({_id:req.user._id})
    var rank=user.rank
    await User.findByIdAndUpdate(req.user._id,{"rank":rank+1},function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.send({success:true,rank:rank+1});
        }
    })
})
module.exports=router;