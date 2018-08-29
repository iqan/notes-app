const usersDao = require('./users.dao');
const auth = require('../auth');
const authConfig = require('../../../config').authConfig;

const login = (user) => {
  return new Promise((resolve, reject) => {
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
  return usersDao.register(user);
};

module.exports = {
  login,
  register
};