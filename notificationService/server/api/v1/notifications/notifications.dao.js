const notificationsModel = require('./notifications.entity');
const log = require('../../../logging');

const getNotificationsToProcess = (callback) => {
  log.info('getting notifications to process');
  notificationsModel.find({ isReminded: false })
    .where('remindAt').lt(Date.now())
    .exec(callback);
}

const addNotification = (userName, notification) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification');

    try {
      const notificationToAdd = new notificationsModel({
        userId: notification.userId,
        userName: userName,
        isReminded: false,
        remindAt: Date.now(),
        note: notification.note
      });
  
      notificationToAdd.save((err, savedNotification) => {
        log.info('notification saved');
        resolve({ message: 'notification added', status: 201, notification: savedNotification });
      });
    } catch (error) {
      log.error(error);
      reject({ message: 'Failed to notify due to internal error', status: 500 });
    }
  });
}

module.exports = {
  getNotificationsToProcess,
  addNotification
}