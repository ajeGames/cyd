var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
  TableName: "Stories",
  ProjectionExpression: "#key, version, summary.title, summary.penName",
  ExpressionAttributeNames: {
    "#key": "key"
  }
};

docClient.scan(params, function(err, data) {
  if (err) {
    console.error("Unable to scan Stories table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Scan succeeded.", data.Items.length, "items found.");
    data.Items.forEach(function(item) {
      console.log(item);
    });
  }
});

params = {
  TableName: "Chapters",
  ProjectionExpression: "storyKeyVersion, id, title"
};

docClient.scan(params, function(err, data) {
  if (err) {
    console.error("Unable to scan Chapters table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Scan succeeded.", data.Items.length, "items found.");
    data.Items.forEach(function(item) {
      console.log(item);
    });
  }
});
