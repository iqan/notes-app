const notesService = require('./notes.service');

const getNotes = (req, res) => {
  const userId = req.query.userId || req.userData.userId;
  notesService.getNotesByUserId(res, userId);
}

const updateNote = (req, res) => {
  const note = req.body;
  const noteId = req.params.noteId;
  notesService.updateNote(res, noteId, note);
}

const createNote = (req, res) => {
  const note = req.body;
  const userId = req.query.userId || req.userData.userId;
  notesService.addNote(res, userId, note);
}

const getNotesAsStream = (req, res) => {
  const userId = req.query.userId || req.userData.userId;
  notesService.getNotesAsStream(res, userId);
}

const uploadNotes = (req, res) => {
  const notes = JSON.parse(req.file.buffer.toString());
  const userId = req.userData.userId;
  notesService.uploadNotes(res, userId, notes);
}

const shareNotes = (req, res) => {
  const notes = req.body.notes;
  const collaborator = req.body.collaborator;
  notesService.shareNotes(res, collaborator, notes);
}

const deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  notesService.deleteNote(res, noteId);
}

module.exports = {
  getNotes,
  updateNote,
  createNote,
  getNotesAsStream,
  uploadNotes,
  shareNotes,
  deleteNote
}
