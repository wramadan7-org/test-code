require('dotenv').config();
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const compare = require('../utils/compare');
const hasing = require('../utils/hashing');

const userService = require('../services/userService');

const login = async (req, res) => {
  try {
    const loginBody = req.body;

    const user = await userService.getOneUserByQuery({ email: loginBody.email });

    if (!user) return res.sendWrapped('Email not registered.', httpStatus.NOT_FOUND);

    const checkPassword = await compare(loginBody.password, user.password);

    if (!checkPassword) return res.sendWrapped('Wrong password', httpStatus.NOT_FOUND);

    const payload = {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.detail.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

    const data = {
      token,
    };

    res.sendWrapped(data, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const register = async (req, res) => {
  try {
    const registerBody = req.body;

    const checkEmail = await userService.getOneUserByQuery({ email: registerBody.email });

    if (checkEmail) return res.sendWrapped('Email already exists.', httpStatus.CONFLICT);

    const hash = hasing(registerBody.password, 10);

    const data = {
      ...registerBody,
      password: hash,
    };

    const registered = await userService.createUser(data);

    res.sendWrapped(registered, httpStatus.CREATED);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

module.exports = {
  login,
  register,
};
