const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/validateRole');

const adminController = require('../controllers/adminController');

router.post('/', auth, admin, adminController.createAccount);
router.get('/', auth, admin, adminController.getAllAccount);

module.exports = router;
