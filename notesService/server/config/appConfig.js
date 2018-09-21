// write your application configration here

const appConfig = {
  port: process.env.PORT || 3002,
  enableStub: process.env.ENABLE_STUB || 'yes',
  userProfileUrl: process.env.USER_PROFILE_URL || 'http://localhost:3001/',
  notificationsApiUrl: process.env.NOTIFICATIONS_API_URL || 'http://localhost:3003/'
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/notes-app-local'
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

const authConfig = {
  secret: 'some-secret-value'
};

module.exports = {
  appConfig,
  dbConfig,
  logConfig,
  authConfig
}
