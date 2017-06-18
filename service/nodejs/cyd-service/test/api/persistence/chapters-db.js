const should = require('should');
const expect = require('expect');
const chaptersDataAccess = require('../../../api/persistence/chapters-db');
const logger = require('../../../api/helpers/logger');
const { wrapAsserts } = require('../testHelper');

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
    xit('creates chapter', function (done) {
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

    xit('updates chapter');
    xit('adds sign to signpost');
    xit('removes sign from signpost');
    xit('updates sign from signpost');
    xit('atomically adds, updates and removes signs on signpost');
    xit('removes chapter');
  });
});