const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { user } = require('../middlewares/validateRole');

const userController = require('../controllers/userController');

router.get('/', auth, user, userController.getOwnProfile);
router.patch('/', auth, user, userController.updateOwnProfile);

module.exports = router;
