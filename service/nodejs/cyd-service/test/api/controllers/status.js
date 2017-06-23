var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {
  describe('status', function() {
    describe('GET /v1/status', function() {
      it('should return status information', function(done) {
        request(server)
          .get('/v1/status')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.exist;
            done();
          });
      });
    });
  });
});
