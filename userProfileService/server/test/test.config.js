//  Test Configuration Object

const users = {
    user1: { username: 'user1', password: 'pass1' },
    user1WithWrongPassword: { username: 'user1', password: '123' },
    user2: { username: 'user2', password: 'pass2' }
};

const incorrectUsers = {
    userWithoutUserName: { password: 'pass1' },
    userWithoutPassword: { username: 'user1' }
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

const responseMessages = {
    userExists: 'username is already exist',
    incorrectPassword: 'Passwords is incorrect',
    incorrectUserName: 'You are not registered user',
    userNameIsRequired: 'username is required',
    passwordIsRequired: 'password is required',
    userNameAndPasswordRequired: 'username and password are required'
};

const auth = {
    payload: { name: 'somename' },
    secret: 'some-secret-value',
    expiresInOneHour: '1h',
    expiresInOneMilliSecond: '1ms'
}

module.exports = {
    users,
    userInfo,
    registeredUsers,
    responseMessages,
    auth,
    incorrectUsers
};
