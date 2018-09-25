const should = require('chai').should(); // eslint-disable-line no-unused-vars
const io = require('socket.io-client');
const config = require('../test/test.config');
const appSocket = require('./app.socket');
const server = require('http').createServer();

describe('Note share scenarios', function() {
  let client;

  // server setup
  before(() => {
    appSocket.setup(server);
    server.listen(3000);
  });

  beforeEach(() => {
    client = io.connect('http://localhost:3003');
    const userInfo = 'u1@p1.com';
    client.emit('register', userInfo);
  });

  afterEach(() => {
    client.disconnect();
  });

  it('Should share note with another user', function(done) {
    const note = config.notes.note1;
    const noteShare = { userName: 'u1@p1.com', note: note };

    client.on('share-note', (shareInfo) => {
      shareInfo.should.not.equal(null);
      shareInfo.userName.should.equal('u1@p1.com');
      done();
    });

    setTimeout(() => { // eslint-disable-line
      appSocket.notify(noteShare);
    }, 2000);
  }).timeout(5000);
});
