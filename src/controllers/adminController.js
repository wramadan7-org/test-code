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

const getAllAccount = async (req, res) => {
  try {
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
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const getAccountById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOneUserByQuery({ _id: id });

  if (!user) return res.sendWrapped('User no\'t found.', httpStatus.NOT_FOUND);

  res.sendWrapped(user, httpStatus.OK);
};

const updateAccountById = async (req, res) => {
  const { id } = req.params;
  let userBody = req.body;

  const user = await userService.getOneUserByQuery({ _id: id });

  if (!user) return res.sendWrapped('User no\'t found.', httpStatus.NOT_FOUND);

  let defaultEmail = user.email;
  let defaultPhoneNumber = user.phoneNumber;

  // Check duplicate email
  if (userBody.email) {
    const availEmail = await userService.getManyUserByQuery(
      {
        $and: [
          {
            email: userBody.email,
          },
          {
            email: {
              $ne: user.email,
            },
          },
        ],
      },
    );

    if (availEmail && availEmail.length > 0) return res.sendWrapped('Email already exists.', httpStatus.CONFLICT);

    defaultEmail = userBody.email;
  }

  // Check duplicate phone number
  if (userBody.phoneNumber) {
    const availPhoneNumber = await userService.getManyUserByQuery(
      {
        $and: [
          {
            phoneNumber: userBody.phoneNumber,
          },
          {
            phoneNumber: {
              $ne: user.phoneNumber,
            },
          },
        ],
      },
    );

    if (availPhoneNumber && availPhoneNumber.length > 0) return res.sendWrapped('Phone number already exists.', httpStatus.CONFLICT);

    defaultPhoneNumber = userBody.phoneNumber;
  }

  let tempData = {
    phoneNumber: defaultPhoneNumber,
    email: defaultEmail,
  };

  Object.assign(userBody, tempData);

  Object.assign(user, userBody);

  const updateAccount = await userService.updateUser(id, userBody);

  res.sendWrapped(updateAccount, httpStatus.OK);
};

const deleteAccountById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getOneUserByQuery({ _id: id });

  if (!user) return res.sendWrapped('User no\'t found.', httpStatus.NOT_FOUND);

  const deleteAccount = await userService.deleteUserById(id);

  res.sendWrapped(deleteAccount, httpStatus.OK);
};

module.exports = {
  createAccount,
  getAllAccount,
  getAccountById,
  updateAccountById,
  deleteAccountById,
};
