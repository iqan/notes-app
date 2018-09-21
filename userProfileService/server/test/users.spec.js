const should = require('chai').should(); // eslint-disable-line no-unused-vars
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const modules = require('../modules');

// Initialize db connection before all tests
before((done) => {
  modules.initializeMongooseConnection()
    .then(() => {
      done();
    });
});

// clear users collection
before((done) => {
  modules.userModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});

//  testsuite
describe('Testing to register a user', function()
{
  //  testcase
  it('Should handle a request to register a user', function(done)
  {
    // Response body should have a key as userInfo which will hold 'username' value
    // status code = 201
    // response body will hold user.userName
    const user1 = config.users.user1;
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        const username = response.body.userInfo;
        username.should.equal(user1.username, 'response should return proper userInfo');
        done();
      });
  });

  //  testcase
  it('Should handle a request to register a user multiple times with same username', function(done)
  {
    //Response body should have a key as message which will hold value as 'username is already exist'
    // status code = 403
    // response body will hold an object with message key
    const user1 = config.users.user1;
    const errorMessage = config.responseMessages.userExists;
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to register a user without username', function(done)
  {
    //Response body should have a key as message which will hold value as 'username is required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = config.incorrectUsers.userWithoutUserName;
    const errorMessage = config.responseMessages.userNameIsRequired;
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to register a user without password', function(done)
  {
    //Response body should have a key as message which will hold value as 'password is required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = config.incorrectUsers.userWithoutPassword;
    const errorMessage = config.responseMessages.passwordIsRequired;
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to register a user without username and password', function(done)
  {
    //Response body should have a key as message which will hold value as 'username and password are required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = { };
    const errorMessage = config.responseMessages.userNameAndPasswordRequired;
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });
});

//  testsuite
describe('Testing to login user', function()
{
  //  testcase
  it('Should handle a request to successfully login', function(done)
  {
    //Response body should have a key as user which will hold userName as a key and it will hold username value
    // status code = 200
    // response body will hold user.userName
    const user1 = config.users.user1;
    request(app)
      .post('/api/v1/users/login')
      .send(user1)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const username = response.body.user.userName;
        const token = response.body.token;
        username.should.equal(user1.username, 'response should return proper userInfo');
        token.should.be.a('string');
        done();
      });
  });

  //  testcase
  it('Should handle a request to login with wrong password', function(done)
  {
   //Response body should have a key as message which will hold value as 'Password is incorrect'
   // status code = 403
   // response body will hold an object with message key
   const user1 = config.users.user1WithWrongPassword;
   const expectedError = config.responseMessages.incorrectPassword;
   request(app)
     .post('/api/v1/users/login')
     .send(user1)
     .expect(403)
     .end((error, response) => {
       if(error) return done(error);
       const message = response.body.message;
       message.should.equal(expectedError, 'response should return proper error message');
       done();
     });
  });

  //  testcase
  it('Should handle a request to login with wrong username', function(done)
  {
    //Response body should have a key as message which will hold value as 'You are not registered user'
    // status code = 403
    // response body will hold an object with message key
    const user2 = config.users.user2;
    const expectedError = config.responseMessages.incorrectUserName;
    request(app)
      .post('/api/v1/users/login')
      .send(user2)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const message = response.body.message;
        message.should.equal(expectedError, 'response should return proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to login a user without username', function(done)
  {
    //Response body should have a key as message which will hold value as 'username is required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = config.incorrectUsers.userWithoutUserName;
    const errorMessage = config.responseMessages.userNameIsRequired;
    request(app)
      .post('/api/v1/users/login')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to login a user without password', function(done)
  {
    //Response body should have a key as message which will hold value as 'password is required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = config.incorrectUsers.userWithoutPassword;
    const errorMessage = config.responseMessages.passwordIsRequired;
    request(app)
      .post('/api/v1/users/login')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });

  // negative testcase
  it('Should handle a request to login a user without username and password', function(done)
  {
    //Response body should have a key as message which will hold value as 'username and password are required'
    // status code = 403
    // response body will hold an object with message key
    const user1 = { };
    const errorMessage = config.responseMessages.userNameAndPasswordRequired;
    request(app)
      .post('/api/v1/users/login')
      .send(user1)
      .expect(403)
      .end((error, response) => {
        if(error) return done(error);
        const actualMessage = response.body.message;
        actualMessage.should.equal(errorMessage, 'response should have proper error message');
        done();
      });
  });
});

describe('Testing Internal API calls', function() {
  it('Should handle request to get user by username that exists', function(done) {
    const user1 = config.userInfo.user1;
    request(app)
      .get('/api/v1/users/getbyusername/' + user1.userName)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const user = response.body;
        user.should.not.equal(undefined);
        user.should.not.equal(null);
        user.userName.should.equal(user1.userName);
        user.userId.should.not.equal(null);
        done();
      });
  });

  it('Should handle request to get user by username that does not exist', function(done) {
    const userName = 'not-available-user';
    request(app)
      .get('/api/v1/users/getbyusername/' + userName)
      .expect(404)
      .end((error, response) => {
        if(error) return done(error);
        const body = response.body;
        body.should.not.equal(undefined);
        body.should.not.equal(null);
        body.message.should.equal('User not found');
        done();
      });
  });
});

describe('Getting all users', function() {
  it('Should return list of registered users', function (done) {
    request(app)
    .get('/api/v1/users/getall')
    .expect(200)
    .end((error, response) => {
      if(error) return done(error);
      const body = response.body;
      body.should.not.equal(undefined);
      body.should.not.equal(null);
      body.should.be.a('array', 'should return an array of usernames');
      body[0].should.equal('user1');
      done();
    });
  });
});