const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { user } = require('../middlewares/validateRole');

const userController = require('../controllers/userController');

router.get('/', auth, user, userController.getOwnAccount);
router.patch('/', auth, user, userController.updateOwnAccount);
router.delete('/', auth, user, userController.deleteOwnAccount);

module.exports = router;
