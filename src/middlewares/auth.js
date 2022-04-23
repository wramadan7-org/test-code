require('dotenv').config();
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const { SECRET_JWT } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length);

      jwt.verify(token, SECRET_JWT, (error, user) => {
        if (error) {
          res.sendWrapped('Token not verified.', httpStatus.BAD_REQUEST);
        }

        req.user = user;
        console.log(user);
        next();
      });
    } else {
      res.sendWrapped('Forbidden access.', httpStatus.FORBIDDEN);
    }
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
};
