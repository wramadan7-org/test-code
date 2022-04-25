const httpStatus = require('http-status');

module.exports = {
  admin: (req, res, next) => {
    if (!req.user.role === 'admin') return res.sendWrapped('Forbidden access.', httpStatus.FORBIDDEN);

    next();
  },
  user: (req, res, next) => {
    if (!req.user.role === 'user') return res.sendWrapped('Forbidden access', httpStatus.FORBIDDEN);

    next();
  },
};
