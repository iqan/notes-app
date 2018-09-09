const socketIo = require('socket.io');
const log = require('../logging');

let io;
let sessions = [];

const setup = (server) => {
  log.info('setting up socket');
  io = socketIo(server);

  io.on('connection', onConnect);
}

const onConnect = (socket) => {
  log.info("A client is connected. Id: " + socket.id);

  socket.on('register', (userName) => {
    log.debug('client is registered.');
    sessions.push({ id: socket.id, userName: userName });
  });
};

// shareInfo = { userName: <userName>, note: <note>}
const notify = (shareInfo) => {
  log.info('notifying note share');
  const session = sessions.find(s => s.userName == shareInfo.userName);
  if(session) {
    const socketId = session.id;
    io.to(socketId).emit('share-note', shareInfo);
  }
}

module.exports = {
  setup,
  notify
}
