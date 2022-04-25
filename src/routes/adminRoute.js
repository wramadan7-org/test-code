const { Router } = require('express');

const router = Router();

const auth = require('../middlewares/auth');
const { admin } = require('../middlewares/validateRole');

const adminController = require('../controllers/adminController');

router.post('/', auth, admin, adminController.createAccount);
router.get('/', auth, admin, adminController.getAllAccount);
router.get('/:id', auth, admin, adminController.getAccountById);
router.patch('/:id', auth, admin, adminController.updateAccountById);
router.delete('/:id', auth, admin, adminController.deleteAccountById);

module.exports = router;
