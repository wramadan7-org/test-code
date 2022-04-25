const express = require('express');

const router = express.Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const adminRoute = require('./adminRoute');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
