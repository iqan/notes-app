const log = require('../logging');
const appConfig = require('../config').appConfig;
const request = require('request');

const getUserByUserName = (userName) => {
  log.debug(`getting userId for user: '${userName}' from Stub`);
  if(appConfig.enableStub) {
    return { userId: 'userId for ' + userName, userName: userName }; 
  } else {
    log.debug(`getting userId for user: '${userName}' from API`);
    const url = appConfig.userProfileUrl + 'api/v1/users/getbyusername/' + userName;
    request(url, (err, res, body) => {
      if (err) {
        log.error(err);
        log.warn('Users API returned error, ignoring error and returning null');
        return null;  
      }
      log.debug('got user from Users API: ' + JSON.stringify(body));
      return body;
    });
  }
}

module.exports = {
  getUserByUserName
}