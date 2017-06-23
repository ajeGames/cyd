const admin = require('./admin-db');
const logger = require('../helpers/logger');
const { randomString } = require('../helpers/keyUtil');

const { docClient } = admin.initAWSConnection();
const storyTableName = "Stories";

exports.insertStory = (storyInfo, done) => {
  logger.info('stories-db.insertStory');
  const uniqueKey = randomString(12);
  const story = Object.assign({}, { key: uniqueKey, version: -1, author: 'anonymous' },
    { title: storyInfo.title, penName: storyInfo.penName, tagLine: storyInfo.tagLine,
      about: storyInfo.about });
  const params = {
    TableName: storyTableName,
    Item: story
  };
  const promise = docClient.put(params).promise();
  promise.then(
    (data) => {
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
      done(story);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  );
};

const filterHighestVersionPerUniqueKey = storyData => {
  const highestVersionPerKey = {};
  storyData.forEach(nextItem => {
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
      const latestStories = filterHighestVersionPerUniqueKey(data.Items);
      done(latestStories);
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
      done(data.Items[0]);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('params used:', params);
      done();
    }
  );
};

exports.selectStoryByVersion = (key, version, done) => {
  logger.info('stories-db.selectStoryByVersion, key:', key, 'version:', version);
  const versionInt = (typeof version === 'string') ? parseInt(version) : version;
  const params = {
    TableName: storyTableName,
    Key: {
      "key": key,
      "version": versionInt
    }
  };
  const promise = docClient.get(params).promise();
  promise.then(
    (data) => {
      done(data.Item);
    },
    (error) => {
      logger.error('stories-db', error);
      logger.error('stories-db', 'params used:', params);
      done();
    }
  ).catch(err => {
    logger.error('something went wrong', err);
  })
};

exports.selectDraftStory = (key, done) => {
  logger.info('stories-db.selectDraftStory');
  this.selectStoryByVersion(key, -1, done);
};
