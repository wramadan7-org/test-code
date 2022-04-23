const Joi = require('joi');

const createUser = {
  body: Joi.object().keys(
    {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      phoneNumber: Joi.string().max(14).pattern(/^\d+$/).required(),
      detail: Joi.object().keys(
        {
          address: Joi.string(),
          religion: Joi.string().default('islam'),
          birthdate: Joi.date(),
          profile: Joi.string(),
          role: Joi.string().valid('admin', 'user').default('user'),
        },
      ),
    },
  ),
};

module.exports = {
  createUser,
};
