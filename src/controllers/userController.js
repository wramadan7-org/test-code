const httpStatus = require('http-status');

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

    if (!user) return res.sendWrapped('Fail to create data', httpStatus.BAD_GATEWAY);

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const getOwnProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const users = await userService.getOneUserByQuery({ _id: id });

    res.sendWrapped(users, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

module.exports = {
  createUser,
  getOwnProfile,
};
