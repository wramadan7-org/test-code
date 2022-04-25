const httpStatus = require('http-status');

const bcrypt = require('../utils/hashing');

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

const getOwnAccount = async (req, res) => {
  try {
    const { id } = req.user;
    const users = await userService.getOneUserByQuery({ _id: id });
    console.log(req.user);

    res.sendWrapped(users, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const updateOwnAccount = async (req, res) => {
  const { id, email, phoneNumber } = req.user;
  let userBody = req.body;

  let defaultEmail = email;
  let defaultPhoneNumber = phoneNumber;

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
              $ne: email,
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
              $ne: phoneNumber,
            },
          },
        ],
      },
    );

    if (availPhoneNumber && availPhoneNumber.length > 0) return res.sendWrapped('Phone number already exists.', httpStatus.CONFLICT);

    defaultPhoneNumber = userBody.phoneNumber;
  }

  const tempData = {
    phoneNumber: defaultPhoneNumber,
    email: defaultEmail,
  };

  Object.assign(userBody, tempData);

  const user = await userService.updateUser(id, userBody);

  if (!user) return res.sendWrapped('Update failed.', httpStatus.BAD_GATEWAY);

  res.sendWrapped(user, httpStatus.OK);
};

const deleteOwnAccount = async (req, res) => {
  const { id } = req.user;

  const user = await userService.deleteUserById({ id });

  if (!user) return res.sendWrapped('Fail to delete account', httpStatus.BAD_GATEWAY);

  res.sendWrapped(user, httpStatus.OK);
};

module.exports = {
  createAccount,
  getOwnAccount,
  updateOwnAccount,
  deleteOwnAccount,
};
