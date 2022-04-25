const httpStatus = require('http-status');

module.exports = {
  admin: (req, res, next) => {
    if (!req.user.role === 'admin') return res.sendWrapped('Forbidden access.', httpStatus.FORBIDDEN);

    next();
  },
  user: (req, res, next) => {
    console.log('ssssssss', req.user.role === 'user' ? true : false);
    if (!req.user.role === 'user') return res.sendWrapped('Forbidden access', httpStatus.FORBIDDEN);

    next();
  },
};
