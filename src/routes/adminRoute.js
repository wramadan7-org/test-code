const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/validateRole');

const adminController = require('../controllers/adminController');

router.get('/', auth, admin, adminController.getAllUser);

module.exports = router;
