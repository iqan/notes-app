const expect = require('chai').expect;
const { signJWTToken, verifyJWTToken } = require('../modules');
const config = require('./test.config');

describe('JWT Token test scenarios', function() {
	before(function(done) { done(); });
	after(function(done) { done(); });

	it('Assert signing & verification methods exists and are valid', function() {
		expect(signJWTToken).to.not.equal(undefined);
		expect(signJWTToken).to.not.equal(null);
		expect(typeof(signJWTToken)).to.equal('function');
		expect(signJWTToken.length).to.be.above(0, 'this method must have arguments');

		expect(verifyJWTToken).to.not.equal(undefined);
		expect(verifyJWTToken).to.not.equal(null);
		expect(typeof(verifyJWTToken)).to.equal('function');
		expect(verifyJWTToken.length).to.be.above(0, 'this method must have arguments');

		expect(signJWTToken).to.be.an('function');
	});

	it('sign a token with valid payload, signature, secret and expiry time', function(done) { 
		const testData = config.auth;
		signJWTToken(testData.payload, testData.secret, testData.expiresInOneHour, (err, token) => {
			if(err) return done(err);
			expect(token).to.not.equal(null, 'token should not be null');
			expect(token).to.not.equal(undefined, 'token should not be undefined');
			done();
		});
	});

	it('verification of a valid signed token, must return same payload, which was passed', function(done) {
		const testData = config.auth;
		signJWTToken(testData.payload, testData.secret, testData.expiresInOneHour, (err, token) => {
			if(err) return done(err);
			verifyJWTToken(token, testData.secret, (err, decoded) => {
				if(err) return done(err);
				expect(decoded.name).to.equal(testData.payload.name);
				done();
			});
		});
  });
  
	it('verification a expired token, must return with appropriate error', function(done) {
		const testData = config.auth;
		signJWTToken(testData.payload, testData.secret, testData.expiresInOneMilliSecond, (err, token) => {
			if(err) return done(err);
			setTimeout(verifyJWTToken(token, testData.secret, (err) => { // eslint-disable-line no-undef
				expect(err).to.equal('jwt expired');
				done();
			}), 2);			
		});
  });
  
	it('verification a invalid, must return with appropriate error', function(done) {
		const testData = config.auth;
		const token = 'some-invalid-jwt';
		verifyJWTToken(token, testData.secret, (err) => {
			expect(err).to.equal('jwt malformed');
			done();
		});
	});
});