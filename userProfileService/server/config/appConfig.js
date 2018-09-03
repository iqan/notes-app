// write your application configration here

const appConfig = {
  port: process.env.PORT || 3001
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/notes-app'
};

const authConfig = {
  secret: 'some-secret-value',
  expiry: '10h'
};

const logConfig = {
  level: 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  authConfig,
  logConfig
}
