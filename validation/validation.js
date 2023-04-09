
const joi = require('joi')
const { password }= require('./custom_validation')




const registerData = {
    body: joi.object().keys({
      name: joi.string().required(),
      email: joi.string().required().email(),
      password: joi.string().required().custom(password),
      
    }),
  };



const loginData = {
    body: joi.object().keys({
      email: joi.string().required().email(),
      password: joi.string().required(),
    }),
  };

module.exports= {
    registerData,
    loginData
}