//  Test Configuration Object

const path = require('path');

const users = {
    user1: { username: 'user1', password: 'pass1' },
    user1WithWrongPassword: { username: 'user1', password: '123' },
    user2: { username: 'user2', password: 'pass2' }
};

const registeredUsers = [
  { userName: 'user1', password: 'pass1', userId: 'some-unique-user-id-1' },
  { userName: 'user2', password: 'pass2', userId: 'some-unique-user-id-2' },
  { userName: 'user3', password: 'pass3', userId: 'some-unique-user-id-3' }
];

const userInfo = {
  user1: { userName: 'user1', userId: 'some-unique-user-id-1' },
  user2: { userName: 'user2', userId: 'some-unique-user-id-2' },
  user3: { userName: 'user3', userId: 'some-unique-user-id-3' }
};

const notes = {
  note1: { title: 'title1', text: 'text1', state: 'not-started', userId: 'some-unique-user-id-1' },
  note2: { title: 'title2', text: 'text2', state: 'not-started', userId: 'some-unique-user-id-2' },
  updatedNote1: { title: 'title1', text: 'text updated', state: 'not-started', userId: 'some-unique-user-id-1' }
}

const responseMessages = {
    userExists: 'username is already exist',
    incorrectPassword: 'Passwords is incorrect',
    incorrectUserName: 'You are not registered user'
};

const auth = {
    payload: { name: 'somename' },
    secret: 'some-secret-value',
    expiresInOneHour: '1h',
    expiresInOneMilliSecond: '1ms'
}

const notesPath = path.resolve(__dirname, '..', 'mock_notes.json'); // eslint-disable-line no-undef

module.exports = {
    users,
    userInfo,
    registeredUsers,
    notes,
    responseMessages,
    auth,
    notesPath
};
