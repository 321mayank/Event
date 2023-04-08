const Joi = require('joi');

function userLogin(post) {
  const schema = Joi.object().keys({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
    'confirm-password': Joi.any()
      .valid(Joi.ref('password'))
      .required(),
  });

  return Joi.validate(post, schema, {
    allowUnknown: true,
    abortEarly: false,
  });
}

module.exports = {
  userLogin,
};
