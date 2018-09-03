let userModel = require('./users.entity');
const uuidv4 = require('uuid/v4');
const log = require('../../../logging');

const register = (user) =>{
  return new Promise((resolve, reject) => {
    log.info('registering user: ' + JSON.stringify(user));
    try {
      let newUser = new userModel();
      newUser.userId = uuidv4();
      newUser.userName = user.username;
      newUser.password = user.password;

      newUser.findByUserName((err, user) => {
        if(err) {
          log.error(err);
          reject({ message: 'Failed to register due to unexpected error', status: 500 });
        }
        if(user) {
          reject({ message: 'username is already exist', status: 403 });
        }
      });

      // Saving user in database
      newUser.save(function(error, addedUser) {
        if(error) {
          log.error(error);
          reject({ message: 'Failed to register due to unexpected error', status: 500 });
        } else {
          const userInfo = { userName: addedUser.userName, userId: addedUser.userId };
          resolve({ message: 'Successfully registered', status: 201, userInfo: userInfo });
        }
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to register due to unexpected error', status: 500 });
    }
  });
}

const login = (userToLogin) =>{
  log.info('logging in for user: ' + JSON.stringify(userToLogin));
  return new Promise((resolve, reject) => {
    try {
      let loginUser = new userModel({
        userName: userToLogin.username,
        password: userToLogin.password
      });

      loginUser.findByUserName((err, user) => {
        if(err) {
          log.error(err);
          reject({ message: 'Failed to find user due to unexpected error', status: 500 });
        }
        if(user) {
          loginUser.comparePassword((err, result) => {
            if(err) {
              log.error(err);
              reject({ message: 'Failed to register due to unexpected error', status: 500 });
            }
            if(!result) {
              reject({ message: 'Passwords is incorrect', status: 403 });
            }
            const userInfo = { userName: user.userName, userId: user.userId };
            resolve({ message: 'Successfully logged in', status: 200, userInfo: userInfo });
          });
        } else {
          reject({ message: 'You are not registered user', status: 403 });
        }
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to login due to unexpected error', status: 500 });
    }
  });
}

const getUserByUserName = (userName) => {
  const user = new userModel({
    userName: userName
  });

  user.findByUserName((err, user) => {
    if(err) throw err;
    return user;
  });
  return null;
}

module.exports = {
  register,
  login,
  getUserByUserName
}
