const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { user } = require('../middlewares/validateRole');
const validate = require('../middlewares/validate');

const userValidation = require('../validations/userValidation');

const userController = require('../controllers/userController');

router.get('/', auth, user, userController.getOwnAccount);
router.patch('/', auth, user, validate(userValidation.updateOwnAccount), userController.updateOwnAccount);
router.delete('/', auth, user, userController.deleteOwnAccount);

module.exports = router;
