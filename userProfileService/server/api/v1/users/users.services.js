const usersDao = require('./users.dao');
const auth = require('../auth');
const authConfig = require('../../../config').authConfig;
const usersValidations = require('./users.validations');

const login = (user) => {
  return new Promise((resolve, reject) => {
    usersValidations.validateUser(user);
    usersDao.login(user)
    .then(result => {
      auth.signToken(result.userInfo, authConfig.secret, authConfig.expiry, (err, token) => {
        if(err) reject({ message: 'Failed to generate token', status: 500 });
        resolve({ token: token, user: result.userInfo, status: 200 });
      })
    })
    .catch(err => reject(err));
  });
};

const register = (user) => {
  return new Promise((resolve, reject) => {
    usersValidations.validateUser(user);
    usersDao.register(user)
      .then(result => resolve(result))
      .catch(err => reject(err));
    });
};

module.exports = {
  login,
  register
};