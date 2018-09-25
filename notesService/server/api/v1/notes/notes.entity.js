const mongoose = require('mongoose');

const states = require('./notes.state');

let noteSchema = new mongoose.Schema({
  id: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: states,
    default: 'not-started'
  },
  userId: {
    type: String,
    required: true
  },
  createdOn: {
    type: String,
    default: Date.now(),
    required: true
  },
  modifiedOn: {
    type: String,
    default: Date.now(),
    required: true
  },
  collaborators: [],
  isFavourite: {
    type: Boolean,
    required: true,
    default: false
  },
  groupName: {
    type: String
  }
});

noteSchema.methods.findByUserId = function (callback) {
  return this.model('note')
              .find({ 
                $or: [
                  { userId: this.userId }, 
                  { collaborators: { $elemMatch: { userId: this.userId } } }
                ]
              })
              .exec(callback);
};

noteSchema.methods.findByUserIdStream = function () {
  return this.model('note')
              .find({ 
                $or: [
                  { userId: this.userId }, 
                  { collaborators: { $elemMatch: { userId: this.userId } } }
                ]
              })
              .lean().stream();
};

noteSchema.methods.findAndUpdateNote = function (callback) {
  return this.model('note').findOneAndUpdate(
    { id: this.id },
    { $set: {
        title: this.title,
        text: this.text,
        state: this.state,
        isFavourite: this.isFavourite,
        groupName: this.groupName,
        modifiedOn: Date.now()
      }
    },
    { new: true },
    callback);
};

module.exports = mongoose.model('note', noteSchema);
