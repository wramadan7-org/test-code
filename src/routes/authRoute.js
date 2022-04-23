const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { admin, user } = require('../middlewares/validateRole');
const validate = require('../middlewares/validate');

const userValidate = require('../validations/userValidation');

const authController = require('../controllers/userController');

router.post('/', auth, user, validate(userValidate.createUser), authController.createUser);

module.exports = router;
