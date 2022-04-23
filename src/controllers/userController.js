const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const bcrypt = require('../utils/hashing');

const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const userBody = req.body;

    const hash = bcrypt(userBody.password, 10);

    const data = {
      ...userBody,
      password: hash,
    };

    const user = await userService.createUser(data);

    if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create data');

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

module.exports = {
  createUser,
};
