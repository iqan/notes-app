const log = require('./logging');
const appConfig = require('./config').appConfig;
const notificationsDao = require('./api/v1/notifications/notifications.dao');
const socket = require('./socket');
const async = require('async');

const registerWorker = () => {
  async.forever(
    (next) => {
      doWork();
      //Repeat after the delay
      setTimeout(() => {
        next();
      }, appConfig.sleepDuration)
    },
    (err) => {
      log.error('Error occurred while polling database');
      log.error(err);
    }
  )
}

const doWork = () => {
  log.info('starting process');
  notificationsDao.getNotificationsToProcess((err, notifications) => {
    if(err) {
      log.error('Error occurred while fetching notifications');
      log.error(err);
    }
    log.info('notifications fetched from db');
    log.debug(JSON.stringify(notifications));
    if (notifications && notifications.length > 0) {
      log.info('notifications found');
      const notificationsToProcess = notifications.filter(n => parseInt(n.remindAt) < parseInt(Date.now()));
      log.info('notifications filtered');
      log.debug(JSON.stringify(notificationsToProcess));
      notificationsToProcess.map(n => {
        socket.notify(n);
      });
    }
  });
  log.info('process completed, waiting for next round ...');
}

module.exports = {
  registerWorker
};