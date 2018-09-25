const log = require('../logging');
const appConfig = require('../config').appConfig;
const request = require('sync-request');

const getUserByUserName = (userName) => {
  if(appConfig.enableStub === 'yes') {
    log.debug(`getting userId for user: '${userName}' from Stub`);
    return { userId: 'userId for ' + userName, userName: userName }; 
  } else {
    log.debug(`getting userId for user: '${userName}' from API`);
    const url = appConfig.userProfileUrl + 'api/v1/users/getbyusername/' + userName;
    const res = request('GET', url);
    try {
      const body = res.getBody('utf-8');
      log.debug(body);
      log.debug('got user from Users API: ' + JSON.stringify(body));
      return JSON.parse(body);
    } catch (err) {
      log.error(err);
      log.warn('Users API returned error, ignoring error and returning null');
      return null;
    }
  }
}

module.exports = {
  getUserByUserName
}