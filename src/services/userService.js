const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const User = require('../models/User');

/**
 * Create user
 * @param {Object} userBody
 * @returns { Promise <Object | null> }
 */
const createUser = async (userBody) => {
  const user = await User.create(userBody);

  return user;
};

module.exports = {
  createUser,
};
