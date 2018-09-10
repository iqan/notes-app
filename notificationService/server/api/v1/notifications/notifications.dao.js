const notificationsModel = require('./notifications.entity');
const log = require('../../../logging');

const getNotificationsToProcess = (callback) => {
  log.info('getting notifications to process');
  notificationsModel.find()
    .where('remindAt').lt(Date.now())
    .exec(callback);
}

const addNotification = (userId, notification) => {
  return new Promise((resolve, reject) => {
    log.info('adding notification');

    try {
      const notificationToAdd = new notificationsModel({
        userId: userId,
        userName: notification.userName,
        isReminded: false,
        remindAt: Date.now(),
        note: notification.notes[0]
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
}

module.exports = {
  getNotificationsToProcess,
  addNotification
}