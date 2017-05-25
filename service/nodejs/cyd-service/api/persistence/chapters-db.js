var AWS = require("aws-sdk");

var tableName = "Chapters";

function initAWSConnection() {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
}

/**
 * Maps chapter from DynamoDB structure to internal Object structure.  The data might be returned
 * from DynamoDB as-is or nested under Item or an Items array.
 *
 * @param chapter
 * @returns {*}
 */
function mapChapterItemToApi(chapter) {
  var chapterOut;
  if (chapter && chapter.id) {
    chapterOut = Object.assign({}, {
      id: chapter.id,
      title: chapter.title,
      prose: chapter.prose,
      signpost: chapter.signpost
    });
  }
  console.log('chapter:', chapterOut);
  return chapterOut;
}

function mapItemsToChapters(data) {
  console.log('Items:', data);
  items = data.Items;
  chaptersOut = items.map(function(item) {
    return mapChapterItemToApi(item);
  });
  return chaptersOut;
}

function buildKeyVersion(key, version) {
  var useVersion = (version < 0) ? 'd' : version;
  return key + '-' + useVersion;
}

exports.selectChapters = function(storyKey, version, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var storyKeyVersion = buildKeyVersion(storyKey, version);
  var params = {
    TableName: tableName,
    KeyConditionExpression: "storyKeyVersion = :v1",
    ExpressionAttributeValues: {
      ":v1": storyKeyVersion
    }
  };

  var promise = docClient.query(params).promise();
  promise.then(
    function(data) {
      callback(mapItemsToChapters(data));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  );
};

exports.selectChapter = function(storyKey, version, chapterId, callback) {
  initAWSConnection();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var storyKeyVersion = buildKeyVersion(storyKey, version);
  var params = {
    TableName: tableName,
    Key: {
      "storyKeyVersion": storyKeyVersion,
      "id": chapterId
    }
  };
  var promise = docClient.get(params).promise();
  promise.then(
    function(data) {
      callback(mapChapterItemToApi(data.Item));
    },
    function(error) {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  )
};
