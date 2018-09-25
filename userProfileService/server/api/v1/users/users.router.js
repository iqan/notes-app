const router = require('express').Router();

const userController = require('./users.controller');
const authMiddleware = require('../auth/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/isAuthenticated', authMiddleware, userController.isAuthenticated);
router.get('/getbyusername/:username', userController.getByUserName);
router.get('/getall', userController.getAll);

module.exports = router;
