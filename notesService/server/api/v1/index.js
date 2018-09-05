const router = require('express').Router();

const noteRoutes = require('./notes');
const authService = require('../../services').authServices;

router.use('/notes', authService.checkAuthentication, noteRoutes);

module.exports = router;
