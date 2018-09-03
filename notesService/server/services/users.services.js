const log = require('../logging');

const getUserByUserName = (userName) => {
    log.debug(`getting userId for user: '${userName}'`);
    return 'userId for ' + userName;
}

module.exports = {
    getUserByUserName
}