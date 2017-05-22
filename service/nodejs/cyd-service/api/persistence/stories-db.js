var AWS = require("aws-sdk");

var storyTableName = "Stories";

function initAWSConnection() {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
}

function mapStoryDbToApi(data) {
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
      storyOut = Object.assign({}, story.summary, {key: story.key, version: story.version});
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

exports.retrieveLatestPublishedStories = function(callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: storyTableName,
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
      var mappedResults = resultsFromDB.map(function(result) { return mapStoryDbToApi(result) });
      callback(mappedResults);
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
    }
  );
};

exports.retrieveLatestPublishedStory = function(key, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
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

  var promise = docClient.query(params).promise();
  promise.then(
    function(data) {
      callback(mapStoryDbToApi(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  );
};

exports.retrieveDraftStory = function(key, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: storyTableName,
    Key: {
      "key": key,
      "version": -1
    }
  };
  var promise = docClient.get(params).promise();
  promise.then(
    function(data) {
      callback(mapStoryDbToApi(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  )
};
