// write your application configration here

const appConfig = {
  port: process.env.PORT || 3000
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/keep-2'
};

const logConfig = {
  level: 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  logConfig
}
