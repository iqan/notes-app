// write your application configration here

const appConfig = {
  port: process.env.PORT || 3002,
  enableStub: process.env.ENABLE_STUB || true,
  userProfileUrl: process.env.USER_PROFILE_URL || 'http://localhost:3001/'
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep-2'
};

const logConfig = {
  level: 'debug'
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
