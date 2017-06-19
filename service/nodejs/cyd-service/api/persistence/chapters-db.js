const admin = require('./admin-db');
const logger = require('../helpers/logger');
const { docClient } = admin.initAWSConnection();

const tableName = "Chapters";

/**
 * Maps chapter from DynamoDB structure to internal Object structure.  The data might be returned
 * from DynamoDB as-is or nested under Item or an Items array.
 *
 * @param chapter
 * @returns {*}
 */
const mapChapterItemToApi = chapter => {
  let chapterOut;
  if (chapter && chapter.id) {
    chapterOut = Object.assign({}, {
      id: chapter.id,
      title: chapter.title,
      prose: chapter.prose,
      signpost: chapter.signpost || []
    });
  }
  return chapterOut;
};

const mapItemsToChapters = data => data.Items.map(item => mapChapterItemToApi(item));

const buildKeyVersion = (key, version) => {
  const versionToUse = (version < 0) ? 'd' : version;
  return key + '-' + versionToUse;
};

exports.insertChapter = (storyKey, chapterInfo, done) => {
  logger.info('chapters-db.insertChapter:', storyKey, ':',chapterInfo.id);
  const chapter = {
    storyKeyVersion: buildKeyVersion(storyKey, -1),
    id: chapterInfo.id,
    title: chapterInfo.title,
    prose: chapterInfo.prose
  };
  const params = {
    TableName: tableName,
    Item: chapter
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

exports.insertChapter = (storyKey, chapterInfo, done) => {
  logger.info('chapters-db.insertChapter:', storyKey, ':',chapterInfo.id);
  const chapter = {
    storyKeyVersion: buildKeyVersion(storyKey, -1),
    id: chapterInfo.id,
    title: chapterInfo.title,
    prose: chapterInfo.prose
  };
  const params = {
    TableName: tableName,
    Item: chapter
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

exports.selectChapters = (storyKey, version, done) => {
  logger.info('chapters-db.selectChapters');
  const storyKeyVersion = buildKeyVersion(storyKey, version);
  const params = {
    TableName: tableName,
    KeyConditionExpression: "storyKeyVersion = :v1",
    ExpressionAttributeValues: {
      ":v1": storyKeyVersion
    }
  };
  // logger.info('query params', params);
  const promise = docClient.query(params).promise();
  promise.then(
    data => done(mapItemsToChapters(data)),
    error => {
      console.log('error:', error);
      console.log('params used:', params);
      done();
    }
  );
};

exports.selectChapter = (storyKey, version, chapterId, done) => {
  logger.info('chapters-db.selectChapter');
  const storyKeyVersion = buildKeyVersion(storyKey, version);
  const params = {
    TableName: tableName,
    Key: {
      "storyKeyVersion": storyKeyVersion,
      "id": chapterId
    }
  };
  const promise = docClient.get(params).promise();
  promise.then(
    data => done(mapChapterItemToApi(data.Item)),
    error => {
      console.log('error:', error);
      console.log('params used:', params);
      done();
    }
  )
};

exports.selectDraftChapter = (storyKey, chapterId, done) => {
  logger.info('chapters-db.selectDraftChapter');
  this.selectChapter(storyKey, -1, chapterId, done);
};
