const httpStatus = require('http-status');

const bcrypt = require('../utils/hashing');
const paginate = require('../utils/paginate');

const userService = require('../services/userService');

const createAccount = async (req, res) => {
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

const getAllUser = async (req, res) => {
  let { page, limit } = req.query;

  if (page) {
    page = parseInt(page);
  } else {
    page = 1;
  }

  if (limit) {
    limit = parseInt(limit);
  } else {
    limit = 10;
  }

  const users = await userService.getAllUser();

  const pagination = paginate(users, page, limit);

  res.sendWrapped(null, httpStatus.OK, pagination);
};

module.exports = {
  createAccount,
  getAllUser,
};
