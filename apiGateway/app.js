const express = require('express');
const morgan = require('morgan');
const httpProxy = require('http-proxy-middleware');
const config = require('./config');
const cors = require('cors');

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));
app.use(cors());

app.use('/healthcheck', (req, res) => {
	res.send("It's running...!");
});

proxyUserProfile = httpProxy({ target: config.USER_PROFILE_URL, changeOrigin: true });
app.use('/api/v*/users', proxyUserProfile);

proxyNotesService = httpProxy({ target: config.NOTES_URL, changeOrigin: true });
app.use('/api/v*/notes', proxyNotesService);

proxyNotificationService = httpProxy({ target: config.NOTIFICATIONS_API_URL, changeOrigin: true });
app.use('/api/v*/notifications', proxyNotificationService);

proxySocket = httpProxy({ target: config.NOTIFICATIONS_API_URL, changeOrigin: true, ws: true });
app.use('/', proxySocket);

app.use((req, res) => {
	res.status(404).send({message: 'Resource not found..!'});
});

module.exports = app;