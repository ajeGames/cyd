var AWS = require("aws-sdk");

var tableName = "Stories";

function initAWSConnection() {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
}

/**
 * Maps story from DynamoDB structure to internal Object structure.  The data might be returned
 * from DynamoDB as-is or nested under Item or an Items array.
 *
 * @param data
 * @returns {*}
 */
function mapStoryFromDb(data) {
  var storyOut;
  if (data) {
    var story;
    if (data.Item) {
      story = data.Item;
    } else if (data.key) {
      story = data;
    } else if (data.Items) {
      story = data.Items[0];
    }
    if (story && story.key) {
      storyOut = Object.assign({},
        {
          key: story.key,
          version: story.version,
          title: story.summary.title,
          penName: story.summary.author.penName,
          tagLine: story.summary.tagLine,
          about: story.summary.about,
          firstChapter: story.summary.firstChapter,
          publishedAt: story.summary.publishedAt
        }
      );
    }
  }
  return storyOut;
}

function filterHighestVersionPerUniqueKey(data) {
  var highestVersionPerKey = {};
  data.Items.forEach(function(nextItem) {
    var itemInMap = highestVersionPerKey[nextItem.key];
    if (!itemInMap || itemInMap.version < nextItem.version) {
      highestVersionPerKey[nextItem.key] = nextItem;
    }
  });
  return Object.keys(highestVersionPerKey).map(function(key) { return highestVersionPerKey[key]});
}

exports.selectLatestPublishedStories = function(callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: tableName,
    FilterExpression: "version > :publishedVersionsAreHigher",
    ExpressionAttributeValues: {
      ":publishedVersionsAreHigher": 0
    }
  };

  var promise = docClient.scan(params).promise();
  promise.then(
    function(data) {
      console.log(data);
      var resultsFromDB = filterHighestVersionPerUniqueKey(data);
      var mappedResults = resultsFromDB.map(function(result) { return mapStoryFromDb(result) });
      callback(mappedResults);
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
    }
  );
};

exports.selectLatestPublishedStory = function(key, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: tableName,
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

  var promise = docClient.query(params).promise();
  promise.then(
    function(data) {
      callback(mapStoryFromDb(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  );
};

exports.selectStoryByVersion = function(key, version, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: tableName,
    Key: {
      "key": key,
      "version": version
    }
  };
  var promise = docClient.get(params).promise();
  promise.then(
    function(data) {
      callback(mapStoryFromDb(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  )
};

exports.selectDraftStory = function(key, callback) {
  this.selectStoryByVersion(key, -1, callback);
};
