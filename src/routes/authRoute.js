const { Router } = require('express');

const router = Router();

const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');

const authController = require('../controllers/authController');

router.post('/login', validate(authValidation.login), authController.login);
router.post('/register', validate(authValidation.register), authController.register);

module.exports = router;
