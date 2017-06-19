const should = require('should');
const expect = require('expect');
const chaptersDataAccess = require('../../../api/persistence/chapters-db');
const storiesDataAccess = require('../../../api/persistence/stories-db');
const logger = require('../../../api/helpers/logger');
const {wrapAsserts} = require('../testHelper');

describe('chapters-db', function () {

  describe('methods for reading', function () {
    it('gets chapters for given version of story', function (done) {
      const checkResults = results => {
        results.length.should.equal(2);
        results[0].id.should.equal(1000);
        results[1].id.should.equal(1001);
      };
      const callback = wrapAsserts(checkResults, done);
      chaptersDataAccess.selectChapters('efgh1234qwer', 1, callback);
    });

    it('gets specific chapter of given version of story', function (done) {
      const checkResults = results => {
        results.id.should.equal(1001);
        results.title.should.equal('Johnny Goes to School.');
      };
      const callback = wrapAsserts(checkResults, done);
      chaptersDataAccess.selectChapter('efgh1234qwer', 1, 1001, callback);
    });
  });

  describe('methods for editing chapters', function () {
    let storyKey;
    beforeEach(function (done) {
      const testStory = {
        title: 'TEST used to test chapter editing'
      };
      const doAfter = function (results) {
        storyKey = results.key;
        done();
      };
      storiesDataAccess.insertStory(testStory, doAfter);
    });

    it('creates chapter', function (done) {
      const chapterInfo = {
        id: 1,
        title: 'Chapter One',
        prose: 'This is the first chapter.'
      };
      const checkResults = results => {
        results.id.should.equal(chapterInfo.id);
        results.title.should.equal(chapterInfo.title);
        results.prose.should.equal(chapterInfo.prose);
        results.signpost.length.should.equal(0);
      };
      const callback = wrapAsserts(checkResults, done);
      chaptersDataAccess.insertChapter(storyKey, chapterInfo, callback);
    });

    xit('fails when asked to create chapter with duplicate ID', function (done) {
      // TODO - get this test to pass
      const chapterInfo = {
        id: 1,
        title: 'Chapter One',
        prose: 'This is the first chapter.'
      };
      const chapter2Info = {
        id: 1,
        title: 'Another Chapter One',
        prose: 'This is the second chapter.'
      };
      const doAfterSecond = secondResult => {
        logger.info('=== result of duplicate ID ===>', secondResult);
        should.not.exist(secondResult);
      };
      const doAfterFirst = firstResult => {
        firstResult.should.have.properties('id', 'title', 'prose', 'signpost');
        chaptersDataAccess.insertChapter(storyKey, chapter2Info,
          wrapAsserts(doAfterSecond, done));
      };
      chaptersDataAccess.insertChapter(storyKey, chapterInfo, doAfterFirst);
    });

    it('gets draft chapter of story', function (done) {
      const checkResults = results => {
        results.should.have.properties('id', 'title', 'prose', 'signpost');
        results.id.should.equal(1000);
        results.title.should.equal('It all starts here.');
        results.signpost.length.should.be.above(0);
      };
      const callback = wrapAsserts(checkResults, done);
      chaptersDataAccess.selectDraftChapter('abcd0001wxyz', 1000, callback);
    });

    xit('updates chapter', function (done) {
      const changes = {
        title: 'UPDATE title',
        prose: 'UPDATE prose'
      };
      const chapterUpdate = Object.assign({}, storyToTest, changes);
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
    xit('adds sign to signpost');
    xit('removes sign from signpost');
    xit('updates sign from signpost');
    xit('atomically adds, updates and removes signs on signpost');
    xit('removes chapter');
  });
});