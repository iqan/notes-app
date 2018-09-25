const notificationsDao = require('./notifications.dao');
const log = require('../../../logging');

const getError = (errorMessage) => {
  return { status: 500, message: 'Something went wrong. Error: ' + errorMessage };
};

const notifyUser = (userId, notificationWithNotes) => {
  try {
    log.info('notifying user: ' + userId);
    return notificationsDao.addNotificationWithMultipleNotes(userId, notificationWithNotes);
  } catch (err) {
    log.error(err);
    return new Promise((resolve, reject) => reject(getError(err.message)));
  }
};

const getReminders = (userId) => {
  try {
    log.info('getting all reminders for user: ' + userId);
    return notificationsDao.getNotificationsForSelf(userId);
  } catch (err) {
    log.error(err);
    return new Promise((resolve, reject) => reject(getError(err.message)));
  }
};

const addReminder = (userId, notification) => {
  try {
    log.info('adding a reminder for user: ' + userId);
    return notificationsDao.addNotification(userId, notification);
  } catch (err) {
    log.error(err);
    return new Promise((resolve, reject) => reject(getError(err.message)));
  }
};

const snoozeReminder = (notificationId, notification) => {
  try {
    log.info('snoozing a reminder: ' + notificationId);
    return notificationsDao.updateReminder(notificationId, notification);
  } catch (err) {
    log.error(err);
    return new Promise((resolve, reject) => reject(getError(err.message)));
  }
};

const dismissReminder = (notificationId) => {
  try {
    log.info('dismissing a reminder: ' + notificationId);
    return notificationsDao.deleteReminder(notificationId);
  } catch (err) {
    log.error(err);
    return new Promise((resolve, reject) => reject());
  }
};

module.exports = {
  notifyUser,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder
};
