const should = require('should');
const request = require('supertest');
const server = require('../../../app');
const logger = require('../../../api/helpers/logger');

const initNewStory = (callback) => {
  const initialSummary = {
    title: 'this is a TEST story',
    penName: 'bubba the TESTer',
    tagLine: 'we will put you to the TEST',
    about: 'if you TEST me, i will triumph'
  };
  request(server)
    .post('/v1/stories')
    .send(initialSummary)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      should.not.exist(err);
      logger.info('created new test story with key', res.body.key);
      callback(res.body);
    });
};

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
    it('creates a new draft story', (done) => {
      const examineResults = (err, res) => {
        try {
          should.not.exist(err);
          const item = res.body;
          item.should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
            'about');
          item.version.should.equal(-1);
          done();
        }
        catch (err) {
          done(err);
        }
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
  describe('PUT /v1/stories/{key}', () => {
    // TODO create story in setup to avoid collisions with other tests
    let testStory;
    beforeEach(function(done) {
      const doAfter = results => {
        testStory = results;
        done();
      };
      initNewStory(doAfter);
    });
    it('updates a draft story', (done) => {
      const update = {
        title: 'UPDATE My test story',
        penName: 'UPDATE Test Bubba Test',
        tagLine: 'UPDATE This is a tag line',
        about: 'UPDATE Tell you what this is all about.'
      };
      const examineResults = (err, res) => {
        try {
          should.not.exist(err);
          const item = res.body;
          item.should.have.properties('success', 'description');
          done();
        }
        catch (err) {
          done(err);
        }
        // TODO extract method to GET story that can be used for validation
        // try {
        //   item.key.should.equal('abcd0001wxyz');
        //   item.version.should.equal(-1);
        //   item.title.should.equal(update.title);
        //   item.penName.should.equal(update.penName);
        //   item.tagLine.should.equal(update.tagLine);
        //   item.about.should.equal(update.about);
        //   done();
        // }
        // catch (err) {
        //   done (err);
        // }
      };
      request(server)
        .put(`/v1/stories/${testStory.key}`)
        .send(update)
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
