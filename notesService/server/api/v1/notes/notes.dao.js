let noteModel = require('./notes.entity');
const uuidv4 = require('uuid/v4');
const JSONStream = require('JSONStream');

const log = require('../../../logging');

const createNote = (userId, note) =>{
  return new Promise((resolve, reject) => {
    try {
      let newNote = new noteModel({
        id: uuidv4(),
        title: note.title,
        text: note.text,
        state: note.state,
        userId: userId
      });

      log.info('saving note in database');
      newNote.save(function(error, addedNote) {
        if(error) {
          log.error(error);
          reject({ message: 'Failed to create note due to unexpected error', status: 500 });
        } else {
          resolve({ message: 'Successfully created', status: 201, note: addedNote });
        }
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to create note due to unexpected error', status: 500 });
    }
  });
}

const getAllNotes = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const note = new noteModel({
        userId: userId
      });
      
      log.info(`getting notes for a user (${userId}) from database`);
      note.findByUserId(function(error, notes) {
        if(error) {
          log.error(error);
          reject({ message: 'Failed to fetch notes due to unexpected error', status: 500 });
        } else {
          resolve({ message: 'Successfully fetched', status: 200, notes: notes });
        }
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to fetch notes due to unexpected error', status: 500 });
    }
  });
}

const updateNote = (noteId, note) =>{
  return new Promise((resolve, reject) => {
    try {
      let editedNote = new noteModel({
        title: note.title,
        text: note.text,
        state: note.state,
        id: noteId,
        isFavourite: note.isFavourite,
        groupName: note.groupName
      });

      log.info('updating note in database');
      editedNote.findAndUpdateNote(function(error, note) {
        if(error) {
          log.error(error);
          reject({ message: 'Failed to update note due to unexpected error', status: 500 });
        } else {
          resolve({ message: 'Successfully updated', status: 200, note: note });
        }
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to update note due to unexpected error', status: 500 });
    }
  });
}

const readNotesAsStream = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const note = new noteModel({
        userId: userId
      });
      log.info('getting notes as stream');
      const notesStream = note.findByUserIdStream();
      resolve(notesStream.pipe(JSONStream.stringify()));
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to fetch notes due to unexpected error', status: 500 });
    }
  });
}

const bulkInsert = (userId, notes) => {
  return new Promise((resolve, reject) => {
    try {
      log.info('inserting notes in db');
      notes = notes.map(n => {
        let note = n;
        note.id = uuidv4();
        note.userId = userId;
        note.state = 'not-started';
        return note; 
      });
      log.debug(notes);
      noteModel.insertMany(notes, (err, insertedNotes) => {
        if(err) throw err;
        resolve({ notes: insertedNotes });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to upload notes due to unexpected error', status: 500 });
    }
  });
}

const addCollaborator = (collaborator, notes) => {
  return new Promise((resolve, reject) => {
    try {
      log.info('adding collaborators for notes');

      var criteria = {
        id:{ $in: notes.map(n => n.id) }
      };

      noteModel.update(criteria, { $push: { collaborators: collaborator } }, { multi: true }, (err, result) => {
        if(err) throw err;
        log.debug('notes updated and added collaborator');
        log.info(result);
        resolve({ message: 'notes updated', updateResult: result });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to add collaborator notes due to unexpected error', status: 500 });
    }
  });
}

const deleteNote = (noteId) => {
  return new Promise((resolve, reject) => {
    try {
      noteModel.remove({ id: noteId }, (err) => {
        if(err) throw err;
        log.debug('note deleted');
        resolve({ message: 'note deleted', status: 200 });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to delete note due to unexpected error', status: 500 });
    }
  });
}

const deleteNotes = (noteIds) => {
  return new Promise((resolve, reject) => {
    try {
      noteModel.remove({ id: { $in: noteIds } }, (err) => {
        if(err) throw err;
        log.debug('notes deleted');
        resolve({ message: 'notes deleted', status: 200 });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to delete notes due to unexpected error', status: 500 });
    }
  });
}

const addToFavourites = (noteIds) => {
  return new Promise((resolve, reject) => {
    try {
      log.info('adding notes to favourites');

      var criteria = {
        id:{ $in: noteIds }
      };

      noteModel.update(criteria, { isFavourite: true }, { multi: true }, (err, result) => {
        if(err) throw err;
        log.debug('notes updated and added to favourites');
        log.info(result);
        resolve({ message: 'notes added to favourites', updateResult: result });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to add notes to favourites due to unexpected error', status: 500 });
    }
  });
}

const addToGroup = (groupName, noteIds) => {
  return new Promise((resolve, reject) => {
    try {
      log.info('adding notes to group: ' + groupName);

      var criteria = {
        id:{ $in: noteIds }
      };

      noteModel.update(criteria, { groupName: groupName }, { multi: true }, (err, result) => {
        if(err) throw err;
        log.debug('notes updated and added to group: ' + groupName);
        log.info(result);
        resolve({ message: 'notes added to group: ' + groupName, updateResult: result });
      });
    } catch (err) {
      log.error(err);
      reject({ message: 'Failed to add notes to favourites due to unexpected error', status: 500 });
    }
  });
}

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  readNotesAsStream,
  bulkInsert,
  addCollaborator,
  deleteNote,
  deleteNotes,
  addToFavourites,
  addToGroup
}
