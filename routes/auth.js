const router=require('express').Router();
const User=require('../model/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    const {error}=registerValidation(req.body);
    if(error)return res.json({success:false,msg:error.details[0].message});
    

    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.json({success:false,msg:'Email already exists'});
    //Hash Password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        await user.save();
        res.json({success:true});
    }catch(err){
        res.json({success:false,msg:err});
    }

})


router.post('/login',async (req,res)=>{
    const {error}=loginValidation(req.body);
    if(error)return res.json({success:false,msg:error.details[0].message});
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.json({success:false,msg:'Email or Password is wrong'});
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass)return res.json({success:false,msg:'Email or Password is wrong'});
    
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).json({success:true,msg:token});

});

module.exports=router;