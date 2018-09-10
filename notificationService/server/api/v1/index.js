const router = require('express').Router();

const notificationsRoutes = require('./notifications');
const authService = require('../../services').authServices;

router.use('/notifications', authService.checkAuthentication, notificationsRoutes);

module.exports = router;
