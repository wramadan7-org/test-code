const Joi = require('joi');

const updateOwnAccount = {
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
        },
      ),
    },
  ),
};

module.exports = {
  updateOwnAccount,
};
