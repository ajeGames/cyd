var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var tablesToDrop = ["Stories", "PublishedStories", "DraftStories"];

tablesToDrop.forEach(function(table) {
  var params = {
    TableName: table
  };

  dynamodb.deleteTable(params, function (err, data) {
    if (err) {
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  })
});

