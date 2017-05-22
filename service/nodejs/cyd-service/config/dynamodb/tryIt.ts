var AWS = require("aws-sdk");

var storyTableName = "Stories";

function initAWSConnection() {
    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });
}

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
        var filteredData = filterHighestVersionPerUniqueKey(data);
        console.log('highest per key', filteredData);
    },
    function(error) {
        console.log('error:', error);
        console.log('params used:', params);
    }
);

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
