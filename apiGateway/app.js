const express = require('express');
const morgan = require('morgan');
const httpProxy = require('http-proxy-middleware');
const config = require('./config');

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

app.use('/healthcheck', (req, res) => {
	res.send("It's running...!");
});

proxyUserProfile = httpProxy({ target: config.USER_PROFILE_URL });
app.use('/api/v*/users', proxyUserProfile);

app.use((req, res) => {
	res.status(404).send({message: 'Resource not found..!'});
});

module.exports = app;