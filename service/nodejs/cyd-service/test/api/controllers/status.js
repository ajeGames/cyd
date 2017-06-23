const should = require('should');
const expect = require('expect');
const request = require('supertest');
const server = require('../../../app');

describe('controllers', () => {
  describe('status', () => {
    describe('GET /v1/status', () => {
      it('should return status information', done => {
        request(server)
          .get('/v1/status')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.exist;
            // expect(res.body).to.exist;
            done();
          });
      });
    });
  });
});
