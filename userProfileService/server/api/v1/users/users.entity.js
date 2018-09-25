const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  if(user.isModified('password') || user.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) next(err);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if(error) next(error);
        user.password = hash;
        next();
      });
    });
  }
});

userSchema.methods.findByUserName = function (callback) {
  return this.model('user').findOne({ userName: this.userName }, callback);
};

userSchema.methods.comparePassword = function (callback) {
  this.findByUserName((err, user) => {
    bcrypt.compare(this.password, user.password, callback);
  });
};

module.exports = mongoose.model('user', userSchema);
