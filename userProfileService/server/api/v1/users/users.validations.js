const log = require('../../../logging');

const validateUser = (user) => {
    log.info('validating user: ', JSON.stringify(user));

    if (!user || user === null || Object.keys(user).length === 0 && user.constructor === Object) {
        log.debug('user object empty or null');
        throw { status: 403, message: 'username and password are required' };
    }

    if (!user.username || user.username === '') {
        log.debug('username not provided');
        throw { status: 403, message: 'username is required' };
    }

    if (!user.password || user.password === '') {
        log.debug('password not provided');
        throw { status: 403, message: 'password is required' };
    }
}

module.exports = {
    validateUser
};