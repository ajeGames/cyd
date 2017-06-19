const chapterDataAccess = require('../../api/persistence/chapters-db');
const logger = require('../../api/helpers/logger');

// FIXME only if needed

const insertChapter = (storyKey, chapterInfo, done) => {
  logger.info('chapters-db.insertChapter:', storyKey, ':',chapterInfo.id);
  const chapter = {
    storyKeyVersion: buildKeyVersion(storyKey, -1),
    id: chapterInfo.id,
    title: chapterInfo.title,
    prose: chapterInfo.prose
  };
  const params = {
    TableName: tableName,
    Item: chapter,
    ConditionExpression: "attribute_not_exist(storyKeyVersion) AND attribute_not_exists(id)"
  };
  const promise = docClient.put(params).promise();
  promise.then(
    data => done(mapChapterItemToApi(chapter)),
    error => {
      logger.error('chapters-db', error);
      logger.error('chapters-db', 'params used:', params);
      done();
    }
  );
};

const chapterData = {
  id: 1,
  title: 'hello world',
  prose: 'hello big world'
};

insertChapter('abc', chapterData, function (result1) {
  logger.info(result1);
  insertChapter('abc', chapterData, function (result2) {
    logger.info(result2);
  })
});

