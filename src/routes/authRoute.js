const { Router } = require('express');

const router = Router();
const validate = require('../middlewares/validate');
const userValidate = require('../validations/userValidation');

const authController = require('../controllers/userController');

router.post('/', validate(userValidate.createUser), authController.createUser);

module.exports = router;
