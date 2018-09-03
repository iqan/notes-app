const log4js = require('log4js');
const logger = log4js.getLogger();
const logConfig = require('../config').logConfig;

logger.level = logConfig.level;

module.exports = logger;
