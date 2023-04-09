const Joi = require('joi');

function userLogin(post) {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(2)
    // 'confirm-password': Joi.any()
    //   .valid(Joi.ref('password'))
    //   .required(),
  });

  return Joi.validate(post, schema, {
    allowUnknown: true,
    abortEarly: false,
  });
}

function userRegister(post) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
    // 'confirm-password': Joi.any()
    //   .valid(Joi.ref('password'))
    //   .required(),
  });

  return Joi.validate(post, schema, {
    allowUnknown: true,
    abortEarly: false,
  });
}



module.exports = {
  userLogin,
  userRegister
};
