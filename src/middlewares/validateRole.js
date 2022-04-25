const httpStatus = require('http-status');

module.exports = {
  admin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.sendWrapped('Forbidden access.', httpStatus.FORBIDDEN);
    }
  },
  user: (req, res, next) => {
    if (req.user.role === 'user') {
      next();
    } else {
      return res.sendWrapped('Forbidden access', httpStatus.FORBIDDEN);
    }
  },
};
