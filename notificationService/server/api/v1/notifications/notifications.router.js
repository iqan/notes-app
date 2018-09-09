const router = require('express').Router();
const notificationsController = require('./notifications.controller');

router.post('/', notificationsController.notifyUser);
router.get('/reminders', notificationsController.getReminders);
router.post('/reminders', notificationsController.addReminder);
router.put('/reminders', notificationsController.snoozeReminder);
router.delete('/reminders', notificationsController.dismissReminder);

module.exports = router;