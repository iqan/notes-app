const request = request('sync-request');
const log = require('../logging');
const appConfig = require('../config').appConfig;

const notifyUser = (userName, notes) => {
  log.debug('notifying user for notes share. Data: ' + JSON.stringify(notes));
  if(appConfig.enableStub) {
    log.info('notifying user' + userName + ' for notes share via stub');
  } else {
    log.info('notifying user' + userName + ' for notes share via API');
    const url = appConfig.notificationsApiUrl + 'api/v1/notifications';
    const res = request('POST', url, {
      json: {
        userName: userName,
        notes: notes
      }
    });
    try {
      const body = res.getBody('utf-8');
      log.debug('got response from notifications API: ' + JSON.stringify(body));
    } catch (err) {
      log.error(err);
      log.warn('Notifications API returned error, ignoring error');
    }
  }
}

module.exports = {
  notifyUser
}