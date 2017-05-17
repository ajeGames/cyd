var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var tableParamSets = [
  {
    TableName: "PublishedStories",
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
    TableName: "DraftStories",
    KeySchema: [
      {AttributeName: "key", KeyType: "HASH"}
    ],
    AttributeDefinitions: [
      {AttributeName: "key", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  },
  {
    TableName: "PublishedChapters",
    KeySchema: [
      {AttributeName: "key", KeyType: "HASH"},
      {AttributeName: "idVersion", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "key", AttributeType: "S"},
      {AttributeName: "idVersion", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  },
  {
    TableName: "DraftChapters",
    KeySchema: [
      {AttributeName: "key", KeyType: "HASH"}
    ],
    AttributeDefinitions: [
      {AttributeName: "key", AttributeType: "S"},
      {AttributeName: "id", AttributeType: "N"}
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
