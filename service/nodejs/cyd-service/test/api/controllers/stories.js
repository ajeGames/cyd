const should = require('should');
const request = require('supertest');
const server = require('../../../app');
const logger = require('../../../api/helpers/logger');

describe('stories', () => {
  describe('GET /v1/stories', () => {
    it('returns summaries of all published stories', (done) => {
      const examineResults = (err, res) => {
        should.not.exist(err);
        const items = res.body;
        items.length.should.be.above(0);
        items[0].should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
          'about', 'firstChapter', 'publishedAt');
        done();
      };
      request(server)
        .get('/v1/stories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(examineResults);
    });
  });
  describe('POST /v1/stories', () => {
    it('creates a new draft story given summary information', (done) => {
      const examineResults = (err, res) => {
        should.not.exist(err);
        const item = res.body;
        item.should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
          'about');
        item.version.should.equal(-1);
        done();
      };
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
        .end(examineResults);
    });
  });
  describe('GET /v1/stories/{key}', () => {
    it('returns summary of draft story', (done) => {
      const examineResults = (err, res) => {
        should.not.exist(err);
        const item = res.body;
        should.exist(item);
        item.should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
          'about', 'firstChapter');
        item.version.should.equal(-1);
        done();
      };
      request(server)
        .get('/v1/stories/abcd0001wxyz')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(examineResults);
    });
  });
  describe('GET /v1/stories/{key}/{version}', () => {
    it('returns specific version of story summary', (done) => {
      const examineResults = (err, res) => {
        should.not.exist(err);
        const item = res.body;
        should.exist(item);
        item.should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
          'about', 'firstChapter', 'publishedAt');
        item.version.should.equal(2);
        done();
      };
      request(server)
        .get('/v1/stories/abcd0001wxyz/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(examineResults);
    });
  });
});
