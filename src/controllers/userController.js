const httpStatus = require('http-status');
const userModel = require('../models/User');
const ApiError = require('../utils/ApiError');

const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const userBody = req.body;

    const user = await userService.createUser(userBody);

    // if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create data');

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

module.exports = {
  createUser,
};
