const should = require('should');
const request = require('supertest');
const server = require('../../../app');
const logger = require('../../../api/helpers/logger');

describe('controllers', () => {
  describe('stories', () => {
    describe('GET /v1/stories', () => {
      it('should return summaries of all published stories', (done) => {
        request(server)
          .get('/v1/stories')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.exist;
            const items = res.body;
            items.length.should.be.above(0);
            items[0].should.have.properties('title', 'version', 'penName', 'tagLine', 'about', 'publishedAt');
            done();
          });
      });
    });
    describe('POST /v1/stories', () => {
      it('should create a new draft story', (done) => {
        request(server)
          .post('/v1/stories')
          .send({
            title: 'My test story',
            penName: 'Test Bubba Test',
            tagLine: 'This is a tag line',
            about: 'Tell you what this is all about.'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.exist;
            logger.info(res.body);
            done();
          });
      });
    });
  });
});
