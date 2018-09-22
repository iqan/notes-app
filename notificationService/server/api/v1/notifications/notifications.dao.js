const notificationsModel = require('./notifications.entity');
const log = require('../../../logging');

const getNotificationsToProcess = (callback) => {
  log.info('getting all notifications to process');
  notificationsModel.find()
    .exec(callback);
};

const addNotificationWithMultipleNotes = (userId, notificationWithMultipleNotes) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification');

    try {
      const notificationsToAdd = notificationWithMultipleNotes.notes.map(n => {
        return new notificationsModel({
          userId: userId,
          userName: notificationWithMultipleNotes.userName,
          isReminded: false,
          remindAt: new Date().toISOString(),
          self: false,
          note: n
        });
      });
  
      notificationsModel.insertMany(notificationsToAdd, (err, savedNotifications) => {
        if(err) throw err;
        log.info('notifications saved');
        log.debug(JSON.stringify(savedNotifications));
        resolve({ message: 'notifications added to share', status: 201, notifications: savedNotifications });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

const addNotification = (userId, notification) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification/ reminder');

    try {
      const notificationToAdd = new notificationsModel({
        userId: userId,
        userName: notification.userName,
        isReminded: false,
        remindAt: notification.remindAt,
        note: notification.note
      });
  
      notificationToAdd.save((err, savedNotification) => {
        if(err) throw err;
        log.info('notification saved');
        log.debug(JSON.stringify(savedNotification));
        resolve({ message: 'notification added', status: 201, notification: savedNotification });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
};

const getNotificationsForSelf = (userId) => {
  return new Promise((resolve, reject) => {
    log.info('fetching notification/ reminder');

    try {
      const notificationToAdd = new notificationsModel({
        userId: userId
      });
  
      notificationToAdd.findByUserId((err, notificationsInDb) => {
        if(err) throw err;
        const notifications = notificationsInDb.filter(n => n.self);
        log.info('notification found and returning');
        log.debug(JSON.stringify(notifications));
        resolve({ message: 'notification found', status: 200, notifications: notifications });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to get reminders/notifications  due to internal error', status: 500 });
    }
  });
};

const updateReminder = (notificationId, notification) => {
  return new Promise((resolve, reject) => {
    log.info('updating reminder');

    try {
      const notificationToAdd = new notificationsModel({
        _id: notificationId,
        remindAt: notification.remindAt,
        isSent: false
      });
  
      notificationToAdd.findAndUpdateNotification((err, savedNotification) => {
        if(err) throw err;
        log.info('reminder updated');
        log.debug(JSON.stringify(savedNotification));
        resolve({ message: 'reminder updated', status: 200, notification: savedNotification });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

const deleteReminder = (notificationId) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification/ reminder');

    try {  
      notificationsModel.deleteOne({ _id: notificationId }, (err) => {
        if(err) throw err;
        log.info('reminder deleted');
        resolve({ message: 'reminder dismissed', status: 200 });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to delete due to internal error', status: 500 });
    }
  });
};

const markNotificationSent = (notificationId) => {
  return new Promise((resolve, reject) => {
    log.info('updating reminder');

    try {
      const notificationToAdd = new notificationsModel({
        _id: notificationId,
        isSent: true
      });
  
      notificationToAdd.markNotificationSent((err, savedNotification) => {
        if(err) throw err;
        log.info('notification marked sent');
        log.debug(JSON.stringify(savedNotification));
        resolve({ message: 'reminder updated', status: 200, notification: savedNotification });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to update due to internal error', status: 500 });
    }
  });
};

module.exports = {
  getNotificationsToProcess,
  addNotification,
  addNotificationWithMultipleNotes,
  getNotificationsForSelf,
  updateReminder,
  deleteReminder,
  markNotificationSent
};