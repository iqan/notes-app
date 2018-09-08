const router = require('express').Router();
const multer  = require('multer');
const notesController = require('./notes.controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', notesController.getNotes);
router.put('/:noteId', notesController.updateNote);
router.post('/', notesController.createNote);
router.get('/stream', notesController.getNotesAsStream);
router.post('/stream', upload.single('notes'), notesController.uploadNotes);
router.post('/share', notesController.shareNotes);
router.delete('/:noteId', notesController.deleteNote);
router.delete('/', notesController.deleteMultipleNotes);
router.post('/favourites', notesController.addToFavourites);
router.post('/group/:groupName', notesController.addToGroup);

module.exports = router;
