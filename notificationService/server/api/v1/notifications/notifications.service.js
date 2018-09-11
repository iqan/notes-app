const notificationsDao = require('./notifications.dao');

const notifyUser = (res, userId, notificationWithNotes) => {
  notificationsDao.addNotificationWithMultipleNotes(userId, notificationWithNotes)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
};

const getReminders = (res, userId) => {
  notificationsDao.getNotificationsForSelf(userId)
    .then(result => res.status(result.status).json(result.notifications))
    .catch(err => res.status(err.status).json(err));
};

const addReminder = (res, userId, notification) => {
  notificationsDao.addNotification(userId, notification)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
};

const snoozeReminder = (res, notificationId, notification) => {
  notificationsDao.updateReminder(notificationId, notification)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
};

const dismissReminder = (res, notificationId) => {
  notificationsDao.deleteReminder(notificationId)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
};

module.exports = {
  notifyUser,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder
};
