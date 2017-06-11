const admin = require('./admin-db');
const logger = require('../helpers/logger');
const { randomString } = require('../helpers/keyUtil');

const storyTableName = "Stories";

function toStorageForm(story) {
  const { key, version, author, title, penName, tagLine, about, firstChapter, publishedAt } = story;
  return {
    key,
    version,
    author,
    summary: {
      title, penName, tagLine, about, firstChapter, publishedAt
    }
  };
}

function toFlattenedForm(item) {
  const { key, version, author, summary: { title, penName, tagLine, about, firstChapter, publishedAt } } = item;
  return { key, version, author, title, penName, tagLine, about, firstChapter, publishedAt };
}

/**
 * Maps story from DynamoDB structure to internal Object structure.  The data might be returned
 * from DynamoDB as-is or nested under Item or an Items array.
 *
 * @param data
 * @returns {*}
 */
function mapStoryFromDb(data) {
  let storyOut;
  if (data) {
    let story;
    if (data.key) {
      story = data;
    } else if (data.Item) {
      story = data.Item;
    } else if (data.Items) {
      story = data.Items[0];
    }
    if (story && story.key) {
      storyOut = toFlattenedForm(story);
    }
  }
  return storyOut;
}

exports.insertStory = (storySummary, callback) => {
  logger.info('stories-db.insertStory');
  const { docClient } = admin.initAWSConnection();
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
      logger.info('created story', data);
      callback(story);
    },
    (error) => {
      logger.error(error);
      logger.error('params used:', params);
    }
  );
};

exports.updateStory = (story, callback) => {
  logger.info('stories-db.updateStory');
  const { docClient } = admin.initAWSConnection();
  const params = {
    TableName: storyTableName,
    Item: story
  };
  const promise = docClient.put(params).promise();
  promise.then(
    (data) => {
      logger.info('created story', data);
      callback(story);
    },
    (error) => {
      logger.error(error);
      logger.error('params used:', params);
    }
  );
};

function filterHighestVersionPerUniqueKey(data) {
  const highestVersionPerKey = {};
  data.Items.forEach(function(nextItem) {
    const itemInMap = highestVersionPerKey[nextItem.key];
    if (!itemInMap || itemInMap.version < nextItem.version) {
      highestVersionPerKey[nextItem.key] = nextItem;
    }
  });
  return Object.keys(highestVersionPerKey).map(function(key) { return highestVersionPerKey[key]});
}

exports.selectLatestPublishedStories = (callback) => {
  logger.info('stories-db.selectLatestPublishedStories');
  const { docClient } = admin.initAWSConnection();
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
      const mappedResults = resultsFromDB.map(function(result) { return toFlattenedForm(result) });
      callback(mappedResults);
    },
    (error) => {
      logger.error(error);
      logger.error('params used:', params);
    }
  );
};

exports.selectLatestPublishedStory = (key, callback) => {
  logger.info('stories-db.selectLatestPublishedStory');
  const { docClient } = admin.initAWSConnection();
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
      callback(mapStoryFromDb(data));
    },
    (error) => {
      logger.error(error);
      logger.error('params used:', params);
      callback(null);
    }
  );
};

exports.selectStoryByVersion = (key, version, callback) => {
  logger.info('stories-db.selectStoryByVersion');
  const { docClient } = admin.initAWSConnection();
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
      callback(mapStoryFromDb(data));
    },
    (error) => {
      logger.error(error);
      logger.error('params used:', params);
      callback(null);
    }
  )
};

exports.selectDraftStory = (key, callback) => {
  logger.info('stories-db.selectDraftStory');
  this.selectStoryByVersion(key, -1, callback);
};
