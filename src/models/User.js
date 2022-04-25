const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      default: null,
    },
    detail: {
      address: {
        type: String,
        required: false,
        default: null,
      },
      religion: {
        type: String,
        required: false,
        default: 'Islam',
      },
      birthdate: {
        type: Date,
        required: false,
        default: null,
      },
      profile: {
        type: String,
        required: false,
        default: null,
      },
      role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      },
    },
  },
);

userSchema.set('timestamps', true);

module.exports = mongoose.model('user', userSchema, 'users');
