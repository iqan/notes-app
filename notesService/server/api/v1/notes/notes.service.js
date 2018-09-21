const notesDao = require('./notes.dao');
const usersService = require('../../../services').userServices;
const notificationService = require('../../../services').notificationServices;

const getNotesByUserId = (userId) => {
  return notesDao.getAllNotes(userId)
}

const updateNote = (noteId, note) => {
  return notesDao.updateNote(noteId, note);
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

const deleteNote = (noteId) => {
  return notesDao.deleteNote(noteId);
};

const deleteMultipleNote = (noteIds) => {
  return notesDao.deleteNotes(noteIds);
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