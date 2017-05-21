var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing stories into DynamoDB. Please wait.");


console.log("==> Loading sample data...");

var allStories = JSON.parse(fs.readFileSync('sampleStories.json', 'utf8'));
allStories.forEach(function(story) {
  var params = {
    TableName: "Stories",
    Item: {
      "key":  story.key,
      "version": story.version,
      "summary":  story.summary
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add story:", story.key);
      console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Put succeeded:", story.key);
      console.log(data);
    }
  });
});
