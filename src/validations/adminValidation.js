const Joi = require('joi');

const createAccount = {
  body: Joi.object().keys(
    {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      phoneNumber: Joi.string().min(12).max(14).pattern(/^\d+$/)
        .required(),
      detail: Joi.object().keys(
        {
          address: Joi.string().default(null),
          religion: Joi.string().default('islam'),
          birthdate: Joi.date().default(null),
          profile: Joi.string().default(null),
          role: Joi.string().valid('admin', 'user').default('user'),
        },
      ),
    },
  ),
};

const updateAccount = {
  body: Joi.object().keys(
    {
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(3),
      phoneNumber: Joi.string().min(12).max(14).pattern(/^\d+$/),
      detail: Joi.object().keys(
        {
          address: Joi.string().default(null),
          religion: Joi.string().default('islam'),
          birthdate: Joi.date().default(null),
          profile: Joi.string().default(null),
          role: Joi.string().valid('admin', 'user').default('user'),
        },
      ),
    },
  ),
};

module.exports = {
  createAccount,
  updateAccount,
};
