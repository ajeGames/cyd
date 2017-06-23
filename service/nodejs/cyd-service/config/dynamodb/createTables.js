const admin = require('../../api/persistence/admin-db');

const tableParams = [
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
      {AttributeName: "storyKeyVersion", KeyType: "HASH"},
      {AttributeName: "id", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "storyKeyVersion", AttributeType: "S"},
      {AttributeName: "id", AttributeType: "N"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
];

tableParams.forEach(params => admin.createTable(params));
