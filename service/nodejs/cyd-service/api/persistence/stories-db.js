const admin = require('./admin-db');
const logger = require('../helpers/logger');
const { randomString } = require('../helpers/keyUtil');

const { docClient } = admin.initAWSConnection();
const storyTableName = "Stories";

const toStorageForm = story => {
  const { key, version, author, title, penName, tagLine, about, firstChapter, publishedAt } = story;
  return {
    key,
    version,
    author,
    summary: {
      title, penName, tagLine, about, firstChapter, publishedAt
    }
  };
};

const toFlattenedForm = item => {
  const { key, version, author, summary: { title, penName, tagLine, about, firstChapter, publishedAt } } = item;
  return { key, version, author, title, penName, tagLine, about, firstChapter, publishedAt };
};

exports.insertStory = (storySummary, done) => {
  logger.info('stories-db.insertStory');
  const uniqueKey = randomString(12);
  const story = {
    key: uniqueKey,
    version: -1,
    author: 'anonymous',
    summary: storySummary
  };
  const params = {
    TableName: storyTableName,
    Item: story
  };
  const promise = docClient.put(params).promise();
  promise.then(
    (data) => {
      logger.info('stories-db', 'created story');
      done(story);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  );
};

exports.updateStory = (story, done) => {
  logger.info('stories-db.updateStory');
  const params = {
    TableName: storyTableName,
    Item: story
  };
  const promise = docClient.put(params).promise();
  promise.then(
    (data) => {
      logger.info('stories-db', 'created story', data);
      done(story);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  );
};

const filterHighestVersionPerUniqueKey = data => {
  const highestVersionPerKey = {};
  data.Items.forEach(nextItem => {
    const itemInMap = highestVersionPerKey[nextItem.key];
    if (!itemInMap || itemInMap.version < nextItem.version) {
      highestVersionPerKey[nextItem.key] = nextItem;
    }
  });
  return Object.keys(highestVersionPerKey).map(key => highestVersionPerKey[key]);
};

exports.selectLatestPublishedStories = done => {
  logger.info('stories-db.selectLatestPublishedStories');
  const params = {
    TableName: storyTableName,
    FilterExpression: "version > :publishedVersionsAreHigher",
    ExpressionAttributeValues: {
      ":publishedVersionsAreHigher": 0
    }
  };
  const promise = docClient.scan(params).promise();
  promise.then(
    (data) => {
      const resultsFromDB = filterHighestVersionPerUniqueKey(data);
      const mappedResults = resultsFromDB.map(result => toFlattenedForm(result));
      done(mappedResults);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  );
};

exports.selectLatestPublishedStory = (key, done) => {
  logger.info('stories-db.selectLatestPublishedStory');
  const params = {
    TableName: storyTableName,
    Limit: 1,
    ScanIndexForward: false,
    KeyConditionExpression: "#key = :v1 and version > :v2",
    ExpressionAttributeNames: {
      "#key": "key"
    },
    ExpressionAttributeValues: {
      ":v1": key,
      ":v2": 0
    }
  };
  const promise = docClient.query(params).promise();
  promise.then(
    (data) => {
      done(toFlattenedForm(data));
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('params used:', params);
      done();
    }
  );
};

exports.selectStoryByVersion = (key, version, done) => {
  logger.info('stories-db.selectStoryByVersion');
  const params = {
    TableName: storyTableName,
    Key: {
      "key": key,
      "version": version
    }
  };
  const promise = docClient.get(params).promise();
  promise.then(
    (data) => {
      done(toFlattenedForm(data));
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  )
};

exports.selectDraftStory = (key, done) => {
  logger.info('stories-db.selectDraftStory');
  this.selectStoryByVersion(key, -1, done);
};
