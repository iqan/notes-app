const notesService = require('./notes.service');

const getNotes = (req, res) => {
  const userId = req.query.userId || req.userData.userId;
  notesService.getNotesByUserId(userId)
    .then((result) => {
      res.status(result.status).json(result.notes);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const updateNote = (req, res) => {
  const note = req.body;
  const noteId = req.params.noteId;
  const userId = req.query.userId || req.userData.userId;
  notesService.updateNote(userId, noteId, note)
    .then((result) => {
      res.status(result.status).json(result.note);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const createNote = (req, res) => {
  const note = req.body;
  const userId = req.query.userId || req.userData.userId;
  notesService.addNote(userId, note)
    .then((result) => {
      res.status(result.status).json(result.note);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const getNotesAsStream = (req, res) => {
  const userId = req.query.userId || req.userData.userId;
  notesService.getNotesAsStream(res, userId);
};

const uploadNotes = (req, res) => {
  try {
    const notes = JSON.parse(req.file.buffer.toString());
    const userId = req.userData.userId;
    notesService.uploadNotes(userId, notes)
      .then((result) => {
        res.status(201).json(result.notes);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  } catch (err) {
    res.status(500).json('Something went wrong. Error: ' + err.message);
  }
};

const shareNotes = (req, res) => {
  const notes = req.body.notes;
  const collaborator = req.body.collaborator;
  const userToken = req.token;
  notesService.shareNotes(collaborator, notes, userToken)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.query.userId || req.userData.userId;
  notesService.deleteNote(userId, noteId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const deleteMultipleNotes = (req, res) => {
  const noteIds = req.body;
  const userId = req.query.userId || req.userData.userId;
  notesService.deleteMultipleNote(userId, noteIds)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const addToFavourites = (req, res) => {
  const noteIds = req.body;
  notesService.addToFavourites(noteIds)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

const addToGroup = (req, res) => {
  const noteIds = req.body;
  const groupName = req.params.groupName;
  notesService.addToGroup(groupName, noteIds)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};

module.exports = {
  getNotes,
  updateNote,
  createNote,
  getNotesAsStream,
  uploadNotes,
  shareNotes,
  deleteNote,
  deleteMultipleNotes,
  addToFavourites,
  addToGroup
}
