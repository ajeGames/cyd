var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing stories into DynamoDB. Please wait.");

var allStories = JSON.parse(fs.readFileSync('samplePublishedStories.json', 'utf8'));
console.log(allStories);
allStories.forEach(function(story) {
  var params = {
    TableName: "PublishedStories",
    Item: {
      "key":  story.key,
      "version": story.version,
      "summary":  story.summary
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add story", story.key, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Put succeeded:", story.key);
      console.log(data);
    }
  });
});

allStories = JSON.parse(fs.readFileSync('sampleDraftStories.json', 'utf8'));
console.log(allStories);
allStories.forEach(function(story) {
  var params = {
    TableName: "DraftStories",
    Item: {
      "key":  story.key,
      "summary":  story.summary
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add story", story.key, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Put succeeded:", story.key);
      console.log(data);
    }
  });
});
