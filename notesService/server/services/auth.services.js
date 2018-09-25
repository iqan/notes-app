const jwt = require('jsonwebtoken');
const authConfig = require('../config').authConfig;
const log = require('../logging');

const signToken = (payload, secret, expireIn, callback) => {
  jwt.sign(payload, secret, { expiresIn: expireIn }, (err, token) => {
    if(err) return callback(err.message);
    return callback(null, token);
  });
};

const verifyToken = (token, secret, callback) => {
  jwt.verify(token, secret, (err, decoded) => {
    if(err) return callback(err.message);
    return callback(null, decoded);
  });
};

const checkAuthentication = (req, res, next) => {
  try {
    log.info('Authentication check');
    const authHeader = req.get('Authorization');
    if(!authHeader) {
      res.status(403).send('Not authenticated'); return;
    }
    const token = authHeader.replace('Bearer ', '');
    if(!token) { 
      res.status(403).send('Unauthorized'); return;
    }
    verifyToken(token, authConfig.secret, (err, decoded) => {
      if(err) {
        res.status(403).send('invalid token'); return;
      }
      req.userData = decoded;
      req.token = token;
      log.info('User authenticated');
      next();
    });
  } catch (err) {
    log.error(err);
    res.status(403).send('Error occurred in authentication. Error: ', err); return;
  }
}

module.exports = {
    signToken,
    verifyToken,
    checkAuthentication
};