var AWS = require("aws-sdk");

exports.retrievePublishedStory = function(key, callback) {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });

  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName: "PublishedStories",
    Limit: 1,
    ScanIndexForward: false,
    KeyConditionExpression: "#key = :v1",
    ExpressionAttributeNames: {
      "#key": "key"
    },
    ExpressionAttributeValues: {
      ":v1": key
    }
  };

  var request = docClient.query(params);
  var promise = request.promise();

  promise.then(
    function(data) {
      callback(mapStoryDbToApi(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('query params used:', params);
      callback(null);
    }
  );
};

function mapStoryDbToApi(data) {
  var storyOut;
  if (data) {
    var story;
    if (data.Item) {
      story = data.Item;
    } else if (data.Items) {
      story = data.Items[0];
    }
    if (story && story.key) {
      storyOut = Object.assign({}, story.summary, {key: story.key, version: story.version});
    }
  }
  return storyOut;
}
