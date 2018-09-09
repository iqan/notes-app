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
  if (user) {
    collaborator.userId = user.userId;
  }
  notesDao.addCollaborator(collaborator, notes)
    .then((result) => {
      notificationService.notifyUser(collaborator.userName, notes);  
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

const deleteMultipleNote = (res, noteIds) => {
  notesDao.deleteNotes(noteIds)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const addToFavourites = (res, noteIds) => {
  notesDao.addToFavourites(noteIds)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const addToGroup = (res, groupName, noteIds) => {
  notesDao.addToGroup(groupName, noteIds)
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
  deleteNote,
  deleteMultipleNote,
  addToFavourites,
  addToGroup
}