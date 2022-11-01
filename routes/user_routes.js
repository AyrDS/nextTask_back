const express = require('express');
const { checkToken, confirmToken, createUser, getProfile, login, newPassword, resetPassword } = require('../controllers/user_controller.js');
const { checkAuth } = require('../middlewares/index.js');
const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/confirm/:token', confirmToken);
router.post('/reset-password', resetPassword);
router.get('/reset-password/:token', checkToken);
router.post('/reset-password/:token', newPassword);
router.get('/profile', checkAuth, getProfile);

module.exports = router;
