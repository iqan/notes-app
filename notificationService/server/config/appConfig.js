// write your application configration here

const appConfig = {
  port: process.env.PORT || 3003,
  sleepDuration: process.env.SLEEP_DURATION || 1000
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
