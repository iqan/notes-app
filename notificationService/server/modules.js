const initializeMongooseConnection = require('./db').createDbConnection;

const notificationModel = require('./api/v1/notifications/notifications.entity');

const signJWTToken = require('./services').authServices.signToken;

module.exports = {
	initializeMongooseConnection,
  notificationModel,
  signJWTToken
}