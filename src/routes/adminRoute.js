const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/validateRole');
const validate = require('../middlewares/validate');

const adminValidation = require('../validations/adminValidation');

const adminController = require('../controllers/adminController');

router.post('/', auth, admin, validate(adminValidation.createAccount), adminController.createAccount);
router.get('/', auth, admin, adminController.getAllAccount);
router.get('/:id', auth, admin, adminController.getAccountById);
router.patch('/:id', auth, admin, validate(adminValidation.updateAccount), adminController.updateAccountById);
router.delete('/:id', auth, admin, adminController.deleteAccountById);

module.exports = router;
