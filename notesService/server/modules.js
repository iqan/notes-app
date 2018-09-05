const initializeMongooseConnection = require('./db').createDbConnection;

const noteModel = require('./api/v1/notes/notes.entity');

const signJWTToken = require('./services').authServices.signToken;

module.exports = {
	initializeMongooseConnection,
  noteModel,
  signJWTToken
}