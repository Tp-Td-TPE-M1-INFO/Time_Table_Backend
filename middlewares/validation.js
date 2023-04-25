const Joi = require("joi");


//Register validation
const registerValidation = data =>{
    const schema = {
        name: Joi.string().required(),
        surname: Joi.string().required(),
        registerNumber: Joi.string().max(7).required(),
        phone: Joi.string().max(9).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}


const loginValidation = data =>{
    const schema = {
        registerNumber: Joi.string().max(7).required(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;