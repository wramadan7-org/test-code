const Joi = require('joi');

const register = {
  body: Joi.object().keys(
    {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    },
  ),
};

const login = {
  body: Joi.object().keys(
    {
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    },
  ),
};

module.exports = {
  register,
  login,
};
