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
    sessions = sessions.filter(s => s.userName !== userName);
    sessions.push({ id: socket.id, userName: userName });
  });

  socket.on('deregister', userName => {
    log.info('client disconnected. userName: ' + userName);
    sessions = sessions.filter(s => s.userName !== userName);
 });
};

// notification = { userName: <userName>, note: <note>}
const notify = (notification) => {
  log.info('notifying: '+ JSON.stringify(notification));
  log.debug('connected users: ' + JSON.stringify(sessions));
  const session = sessions.find(s => s.userName == notification.userName);
  if(session) {
    const socketId = session.id;
    if(!notification.self) {
      io.to(socketId).emit('share-note', notification);
      log.info('notified user');
    } else {
      io.to(socketId).emit('reminder', notification);
      log.info('reminded user about note');
    }
    return true;
  } else {
    log.info('user session not found');
    return false;
  }
}

module.exports = {
  setup,
  notify
}
