const Joi=require('@hapi/joi');
//Register validation
const registerValidation=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(data);
}
const loginValidation=(data)=>{
    const schema=Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;