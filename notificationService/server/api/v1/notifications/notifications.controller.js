const notificationsService = require('./notifications.service');

const notifyUser = (req, res) => {
  const userId = req.userData.userId;
  const notificationWithNotes = req.body;
  notificationsService.notifyUser(userId, notificationWithNotes)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
}

const getReminders = (req, res) => {
  const userId = req.userData.userId;
  notificationsService.getReminders(userId)
    .then(result => res.status(result.status).json(result.notifications))
    .catch(err => res.status(err.status).json(err));
}

const addReminder = (req, res) => {
  const userId = req.userData.userId;
  const notification = req.body;
  notificationsService.addReminder(userId, notification)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
}

const snoozeReminder = (req, res) => {
  const notificationId = req.params.reminderId;
  const notification = req.body;
  notificationsService.snoozeReminder(notificationId, notification)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
}

const dismissReminder = (req, res) => {
  const notificationId = req.params.reminderId;
  notificationsService.dismissReminder(notificationId)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
}

module.exports = {
  notifyUser,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder
}