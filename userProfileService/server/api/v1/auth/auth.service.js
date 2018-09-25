const jwt = require('jsonwebtoken');

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

module.exports = {
    signToken,
    verifyToken
};