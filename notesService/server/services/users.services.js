const log = require('../logging');

const getUserByUserName = (userName) => {
    log.debug(`getting userId for user: '${userName}'`);
    return { userId: 'userId for ' + userName, userName: userName };
}

module.exports = {
    getUserByUserName
}