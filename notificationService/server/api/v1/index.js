const router = require('express').Router();

const noteRoutes = require('./notifications');
const authService = require('../../services').authServices;

router.use('/notifications', authService.checkAuthentication, noteRoutes);

module.exports = router;
