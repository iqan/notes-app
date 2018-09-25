const notesDao = require('./notes.dao');
const usersService = require('../../../services').userServices;
const notificationService = require('../../../services').notificationServices;

const getNotesByUserId = (userId) => {
  return notesDao.getAllNotes(userId)
}

const updateNote = (userId, noteId, note) => {
  return new Promise((resolve, reject) => {
    notesDao.isUserAllowed(userId, noteId)
    .then(() => resolve(notesDao.updateNote(noteId, note)))
    .catch(err => reject(err));
  });
};

const addNote = (userId, note) => {
  return notesDao.createNote(userId, note);
}

const getNotesAsStream = (res, userId) => {
  notesDao.readNotesAsStream(userId)
    .then((result) => {
      res.set('Content-Type', 'application/json');
      result.pipe(res);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const uploadNotes = (userId, notes) => {
  return notesDao.bulkInsert(userId, notes);
};

const shareNotes = (collaborator, notes, token) => {
  const user = usersService.getUserByUserName(collaborator.userName);
  if (user) {
    collaborator.userId = user.userId;
  }
  return new Promise((resolve, reject) => {
    notesDao.addCollaborator(collaborator, notes)
    .then((result) => {
      notificationService.notifyUser(collaborator.userName, notes, token);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

const deleteNote = (userId, noteId) => {
  return new Promise((resolve, reject) => {
    notesDao.isUserAllowed(userId, noteId)
    .then(() => resolve(notesDao.deleteNote(noteId)))
    .catch(err => reject(err));
  });
};

const deleteMultipleNote = (userId, noteIds) => {
  return new Promise((resolve, reject) => {
    notesDao.isUserAllowed(userId, noteIds[0])
    .then(() => resolve(notesDao.deleteNotes(noteIds)))
    .catch(err => reject(err));
  });
};

const addToFavourites = (noteIds) => {
  return notesDao.addToFavourites(noteIds);
};

const addToGroup = (groupName, noteIds) => {
  return notesDao.addToGroup(groupName, noteIds);
};

module.exports = {
  getNotesByUserId,
  updateNote,
  addNote,
  getNotesAsStream,
  uploadNotes,
  shareNotes,
  deleteNote,
  deleteMultipleNote,
  addToFavourites,
  addToGroup
}