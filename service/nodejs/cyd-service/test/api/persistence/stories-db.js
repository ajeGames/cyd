const should = require('should');
const storiesDataAccess = require('../../../api/persistence/stories-db');
const logger = require('../../../api/helpers/logger');

describe('stories-db', function () {

  const checkResults = function (results) {
    results.should.have.properties('key', 'version', 'author', 'title', 'penName', 'tagLine',
      'about');
  };

  describe('methods for retrieving published stories', function () {
    it('gets latest versions of published stories', function (done) {
      storiesDataAccess.selectLatestPublishedStories(function (results) {
        results.length.should.be.above(0);
        checkResults(results[0]);
        done();
      })
    });

    it('gets latest published version of story', function () {
      storiesDataAccess.selectLatestPublishedStory('abcd0001wxyz', checkResults)
    });

    it('gets specific version of story', function () {
      storiesDataAccess.selectStoryByVersion('abcd0001wxyz', 2, checkResults);
    });

    xit('gets full story, including all chapters');
  });

  describe('story editing methods', function () {
    let storyToTest;
    beforeEach(function (done) {
      const testInput = {
        title: 'Test Loading Draft Story',
        penName: 'Big Tester',
        tagLine: 'This is a test.',
        about: 'This is a test.'
      };
      storiesDataAccess.insertStory(testInput, function (results) {
        storyToTest = results;
        done();
      });
    });

    it('creates new story', function () {
      storyToTest.key.should.exist;
      checkResults(storyToTest);
    });

    it('loads draft story that was just created', function () {
      storiesDataAccess.selectDraftStory(storyToTest.key, checkResults);
    });

    it('updates draft story', function (done) {
      const changes = {
        title: 'UPDATE title',
        penName: 'UPDATE penName',
        tagLine: 'UPDATE tagLine',
        about: 'UPDATE about',
        firstChapter: 42
      };
      const storyUpdate = Object.assign({}, storyToTest, changes);
      storiesDataAccess.updateStory(storyUpdate, function (results) {
        results.key.should.equal(storyToTest.key);
        results.version.should.equal(-1);
        results.author.should.equal(storyToTest.author);
        results.title.should.equal(changes.title);
        results.penName.should.equal(changes.penName);
        results.tagLine.should.equal(changes.tagLine);
        results.about.should.equal(changes.about);
        results.firstChapter.should.equal(changes.firstChapter);
        done();
      });
    });

    xit('publishes draft');
  });
});