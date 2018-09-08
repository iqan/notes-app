const should = require('chai').should(); // eslint-disable-line no-unused-vars
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const modules = require('../modules');
const uuidv4 = require('uuid/v4');

let user1Token;
let user2Token;
let user3Token;

// Initialize db connection before all tests
before((done) => {
  modules.initializeMongooseConnection()
    .then(() => {
      done();
    });
});

// clear notes collection
before((done) => {
  modules.noteModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});

// register 2 users
before((done) => {
  done();
});

// Get JWT token for user 1
before((done) => {
  const user1 = config.userInfo.user1;
  const auth = config.auth;
  modules.signJWTToken(user1, auth.secret, auth.expiresInOneHour, (err, token) => {
      if(err) return done(err);
      user1Token = token;
      done();
  });
});

// Get JWT token for user 2
before((done) => {
  const user2 = config.userInfo.user2;
  const auth = config.auth;
  modules.signJWTToken(user2, auth.secret, auth.expiresInOneHour, (err, token) => {
      if(err) return done(err);
      user2Token = token;
      done();
  });
});

// Get JWT token for user 3
before((done) => {
  const user3 = config.userInfo.user3;
  const auth = config.auth;
  modules.signJWTToken(user3, auth.secret, auth.expiresInOneHour, (err, token) => {
      if(err) return done(err);
      user3Token = token;
      done();
  });
});

//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    // Should get added note of user 1 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    const note1 = config.notes.note1;
    request(app)
      .post('/api/v1/notes')
      .set('Authorization', 'Bearer ' + user1Token)
      .send(note1)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        const noteText = response.body.text;
        noteText.should.equal(note1.text, 'response should return proper note text');
        done();
      });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    const note2 = config.notes.note2;
    request(app)
      .post('/api/v1/notes')
      .set('Authorization', 'Bearer ' + user2Token)
      .send(note2)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        const noteText = response.body.text;
        noteText.should.equal(note2.text, 'response should return proper note text');
        done();
      });
  });
});

//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    // Pass valid token in Authorization header as Bearer
    const note1 = config.notes.note1;
    request(app)
      .get('/api/v1/notes')
      .set('Authorization', 'Bearer ' + user1Token)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        notes.should.be.an('array');
        notes.length.should.be.above(0);
        const noteText = notes[notes.length - 1].text;
        noteText.should.equal(note1.text, 'response should return proper note text');
        done();
      });   
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    // Pass valid token in Authorization header as Bearer
    const note2 = config.notes.note2;
    request(app)
      .get('/api/v1/notes')
      .set('Authorization', 'Bearer ' + user2Token)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        notes.should.be.an('array');
        notes.length.should.be.above(0);
        const noteText = notes[notes.length - 1].text;
        noteText.should.equal(note2.text, 'response should return proper note text');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    // should get blank array
    // status = 200
    // response will be an empty array
    // Pass valid token in Authorization header as Bearer
    request(app)
      .get('/api/v1/notes')
      .set('Authorization', 'Bearer ' + user3Token)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        notes.length.should.equal(0, 'response should return empty array');
        done();
      });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    // Pass valid token in Authorization header as Bearer
    const note1 = config.notes.note1;
    const updatedNote = config.notes.updatedNote1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send(updatedNote)
        .end((error, response) => {
          if(error) return done(error);
          const note = response.body;
          note.text.should.equal(updatedNote.text, 'response should return updated text');
          done();
        });
    });
  });
});

describe('Negative test scenarios', function() {
    it('Make a API request to a resource with invalid token, which requires authentication, should return forbidden status and error ', function(done) { 
      request(app)
        .get(`/api/v1/notes`)
        .set('Authorization', 'Bearer invalid-token-to-get-unauthorized')
        .expect(403)
        .end((error, response) => {
          if(error) return done(error);
          const message = response.text;
          message.should.equal('invalid token', 'user should get invalid token error message');
          done();
        });
    });

    it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
      request(app)
        .get(`/api/v1/notes`)
        .expect(403)
        .end((error, response) => {
          if(error) return done(error);
          const message = response.text;
          message.should.equal('Not authenticated', 'user should get Not authenticated error message');
          done();
        });
    });
});

describe('Stream test scenarios', function () {
  //  testcase
  it('Should get all notes as stream of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a stream array or all notes those are added by user 1
    // Pass valid token in Authorization header as Bearer
    const note1 = config.notes.note1;
    request(app)
      .get('/api/v1/notes/stream')
      .set('Authorization', 'Bearer ' + user1Token)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        let notes = response.body;
        const noteText = notes[0].text;
        noteText.should.equal(note1.text, 'response should return proper note text');
        done();
      });
  });

  //  testcase
  it('Should upload notes in bulk as stream of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 201
    // Pass valid token in Authorization header as Bearer
    const notesPath = config.notesPath;
    request(app)
      .post('/api/v1/notes/stream')
      .set('Authorization', 'Bearer ' + user1Token)
      .attach('notes', notesPath)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        notes.should.not.equal(null);
        notes.should.be.an('array');        
        done();
      });
  });
});

describe('Note share scenarios', function() {
  it('Should share note with another user', function(done) {
    // Should share note with users
    // status = 200
    // Pass valid token in Authorization header as Bearer    
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteShare = { collaborator: { userName: 'u1@p1.com', type: 'editor' }, notes: [savedNote] };
      request(app)
        .post(`/api/v1/notes/share`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send(noteShare)
        .end((error, response) => {
          if(error) return done(error);
          response.body.message.should.equal('notes updated');
          done();
        });
    });
  });
});

describe('Delete note scenarios', function (){
  it('Should handle request to delete note', function(done) {
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .end((error, response) => {
          if(error) return done(error);
          const body = response.body;
          body.should.not.equal(undefined);
          body.should.not.equal(null);
          body.message.should.equal('note deleted', 'response should return message note deleted');
          done();
        });
      });
  });

  it('Should handle request to delete multiple notes', function(done) {
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      request(app)
        .delete(`/api/v1/notes/`)
        .send([ savedNote ])
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .end((error, response) => {
          if(error) return done(error);
          const body = response.body;
          body.should.not.equal(undefined);
          body.should.not.equal(null);
          body.message.should.equal('notes deleted', 'response should return message notes deleted');
          done();
        });
      });
  });
});

describe('Mark note as favorite scenarios', function (){
  it('Should handle request to mark note as favorite', function(done) {
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      savedNote.isFavourite = true;
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send(savedNote)
        .end((error, response) => {
          if(error) return done(error);
          const note = response.body;
          note.isFavourite.should.equal(true, 'response should return note with updated favourite field');
          done();
        });
    });
  });

  it('Should handle request to mark multiple notes as favorite', function(done) {
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      savedNote.isFavourite = true;
      request(app)
        .post(`/api/v1/notes/favourites`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send([ noteId ])
        .end((error, response) => {
          if(error) return done(error);
          const body = response.body;
          body.should.not.equal(undefined);
          body.should.not.equal(null);
          body.message.should.equal('notes added to favourites', 'response should return message notes added to favourite');
          done();
        });
    });
  });
});

describe('Add a note in group scenarios', function (){
  it('Should handle request to add a note in group', function(done) {
    const note1 = config.notes.note1;
    const groupName = 'test1';
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      savedNote.groupName = groupName;
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send(savedNote)
        .end((error, response) => {
          if(error) return done(error);
          const note = response.body;
          note.groupName.should.equal(groupName, 'response should return note with updated groupName field');
          done();
        });
    });
  });

  it('Should handle request to add notes in group', function(done) {
    const note1 = config.notes.note1;
    const note = new modules.noteModel({
      id: uuidv4(),
      title: note1.title,
      text: note1.text,
      userId: note1.userId
    });
    const groupName = 'test1';
    note.save((err, savedNote) => {
      if(err) return done(err);
      const noteId = savedNote.id;
      request(app)
        .post(`/api/v1/notes/group/${groupName}`)
        .set('Authorization', 'Bearer ' + user1Token)
        .expect(200)
        .send([ noteId ])
        .end((error, response) => {
          if(error) return done(error);
          const body = response.body;
          body.should.not.equal(undefined);
          body.should.not.equal(null);
          body.message.should.equal('notes added to group: ' + groupName, 'response should return message notes added to group');
          done();
        });
    });
  });
});
