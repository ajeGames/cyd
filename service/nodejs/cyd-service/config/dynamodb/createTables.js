var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

console.log('==> Creating tables...');

var tableParamSets = [
  {
    TableName: "Stories",
    KeySchema: [
      {AttributeName: "key", KeyType: "HASH"},
      {AttributeName: "version", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "key", AttributeType: "S"},
      {AttributeName: "version", AttributeType: "N"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  },
  {
    TableName: "Chapters",
    KeySchema: [
      {AttributeName: "storyKey", KeyType: "HASH"},
      {AttributeName: "chapterId", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "storyKey", AttributeType: "S"},
      {AttributeName: "chapterId", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
];

tableParamSets.forEach(function(params) {
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
});
