const notesDao = require('./notes.dao');
const usersService = require('../../../services').userServices;
const notificationService = require('../../../services').notificationServices;

const getNotesByUserId = (res, userId) => {
  notesDao.getAllNotes(userId)
    .then((result) => {
      res.status(result.status).json(result.notes);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const updateNote = (res, noteId, note) => {
  notesDao.updateNote(noteId, note)
    .then((result) => {
      res.status(result.status).json(result.note);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const addNote = (res, userId, note) => {
  notesDao.createNote(userId, note)
    .then((result) => {
      res.status(result.status).json(result.note);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
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

const uploadNotes = (res, userId, notes) => {
  notesDao.bulkInsert(userId, notes)
    .then((result) => {
      res.status(201).json(result.notes);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const shareNotes = (res, collaborator, notes) => {
  const user = usersService.getUserByUserName(collaborator.userName);
  collaborator.userId = (user !== null) ? user.userId : null;
  notesDao.addCollaborator(collaborator, notes)
    .then((result) => {
      notificationService.notifyUser(notes);  
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const deleteNote = (res, noteId) => {
  notesDao.deleteNote(noteId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

module.exports = {
  getNotesByUserId,
  updateNote,
  addNote,
  getNotesAsStream,
  uploadNotes,
  shareNotes,
  deleteNote
}