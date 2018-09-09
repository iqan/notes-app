const log = require('./logging');
const appConfig = require('./config').appConfig;
const notificationsDao = require('./api/v1/notifications/notifications.dao');
const socket = require('./socket');

const registerWorker = () => {
  setTimeout(doWork, appConfig.sleepDuration);
}

const doWork = () => {
  log.info('starting process');
  notificationsDao.getNotificationsToProcess(notifications =>
    notifications.map(n => {
      socket.notify(n);
    })
  );
  log.info('process completed, waiting for next round ...');
}

module.exports = {
  registerWorker
};