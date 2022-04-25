const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const User = require('../models/User');

/**
 * Create user
 * @param { Object } userBody
 * @returns { Promise <Object | null> }
 */
const createUser = async (userBody) => {
  const user = await User.create(userBody);

  return user;
};

/**
 * Get all user
 * @returns { Promise <Array> }
 */
const getAllUser = async () => {
  const users = await User.find();

  return users;
};

/**
 * Get one user by query
 * @param { Object } query
 * @returns{ Promise <Object | null> }
 */
const getOneUserByQuery = async (query) => {
  const user = await User.findOne(query);

  return user;
};

/**
 * Get many user by query
 * @param { Object } query
 * @returns { Promise <Array> }
 */
const getManyUserByQuery = async (query) => {
  const users = await User.find(query);

  return users;
};

/**
 * Update user
 * @param { String } id
 * @param { Object } userBody
 * @returns { Promise <Object> }
 */
const updateUser = async (id, userBody) => {
  const user = await getOneUserByQuery({ _id: id });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  Object.assign(user, userBody);
  user.save();

  return user;
};

/**
 * Delete user by id
 * @param { String } id
 * @returns { Promise <Object> }
 */
const deleteUserById = async (id) => {
  const user = await getOneUserByQuery({ _id: id });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  user.remove();

  return user;
};

module.exports = {
  createUser,
  getAllUser,
  getOneUserByQuery,
  getManyUserByQuery,
  updateUser,
  deleteUserById,
};
