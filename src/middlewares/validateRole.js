const httpStatus = require('http-status');

module.exports = {
  admin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    }

    res.sendWrapped('Forbidden access.', httpStatus.FORBIDDEN);
  },
  user: (req, res, next) => {
    if (req.user.role === 'user') {
      next();
    }

    res.sendWrapped('Forbidden access', httpStatus.FORBIDDEN);
  },
};
