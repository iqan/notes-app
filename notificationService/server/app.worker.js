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
  notificationsDao.getNotificationsToProcess(notifications => {
      if (notifications && notifications.length > 0) {
        notifications.map(n => {
          socket.notify(n);
        });
      }
    }
  );
  log.info('process completed, waiting for next round ...');
}

module.exports = {
  registerWorker
};