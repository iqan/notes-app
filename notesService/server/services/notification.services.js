const log = require('../logging');
const appConfig = require('../config').appConfig;

const notifyUser = (notes) => {
  log.debug('notifying user for notes share. Data: ' + JSON.stringify(notes));
  if(appConfig.enableStub) {
    log.info('notifying user for notes share via stub');
  } else {
    log.info('notifying user for notes share via API');
  }
}

module.exports = {
  notifyUser
}