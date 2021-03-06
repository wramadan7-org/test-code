const httpStatus = require('http-status');

const userService = require('../services/userService');

const getOwnAccount = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.getOneUserByQuery({ _id: id });

    if (!user) return res.sendWrapped('You don\'t have account', httpStatus.NOT_FOUND);

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const updateOwnAccount = async (req, res) => {
  try {
    const { id, email, phoneNumber } = req.user;
    let userBody = req.body;

    let defaultEmail = email;
    let defaultPhoneNumber = phoneNumber;

    const checkUser = await userService.getOneUserByQuery({ _id: id });

    if (!checkUser) return res.sendWrapped('You don\'t have account', httpStatus.NOT_FOUND);

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
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

const deleteOwnAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const checkUser = await userService.getOneUserByQuery({ _id: id });

    if (!checkUser) return res.sendWrapped('You don\'t have account', httpStatus.NOT_FOUND);

    const user = await userService.deleteUserById(id);

    if (!user) return res.sendWrapped('Fail to delete account', httpStatus.BAD_GATEWAY);

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};

module.exports = {
  getOwnAccount,
  updateOwnAccount,
  deleteOwnAccount,
};
