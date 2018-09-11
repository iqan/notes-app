const notificationsService = require('./notifications.service');

const notifyUser = (req, res) => {
  const userId = req.userData.userId;
  const notificationWithNotes = req.body;
  notificationsService.notifyUser(res, userId, notificationWithNotes);
}

const getReminders = (req, res) => {
  const userId = req.userData.userId;
  notificationsService.getReminders(res, userId);
}

const addReminder = (req, res) => {
  const userId = req.userData.userId;
  const notification = req.body;
  notificationsService.addReminder(res, userId, notification);
}

const snoozeReminder = (req, res) => {
  const notificationId = req.params.reminderId;
  const notification = req.body;
  notificationsService.snoozeReminder(res, notificationId, notification);
}

const dismissReminder = (req, res) => {
  const notificationId = req.params.reminderId;
  notificationsService.dismissReminder(res, notificationId);
}

module.exports = {
  notifyUser,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder
}