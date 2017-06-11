const admin = require('./admin-db');
const { docClient } = admin.initAWSConnection();

/**
 * Maps chapter from DynamoDB structure to internal Object structure.  The data might be returned
 * from DynamoDB as-is or nested under Item or an Items array.
 *
 * @param chapter
 * @returns {*}
 */
const mapChapterItemToApi = chapter => {
  let chapterOut;
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
};

const mapItemsToChapters = data => {
  console.log('Items:', data);
  items = data.Items;
  chaptersOut = items.map(item => mapChapterItemToApi(item));
  return chaptersOut;
};

const buildKeyVersion = (key, version) => {
  return key + '-' + (version < 0) ? 'd' : version;
};

exports.selectChapters = (storyKey, version, callback) => {
  const storyKeyVersion = buildKeyVersion(storyKey, version);
  const params = {
    TableName: tableName,
    KeyConditionExpression: "storyKeyVersion = :v1",
    ExpressionAttributeValues: {
      ":v1": storyKeyVersion
    }
  };
  const promise = docClient.query(params).promise();
  promise.then(
    data => {
      callback(mapItemsToChapters(data));
    },
    error => {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  );
};

exports.selectChapter = (storyKey, version, chapterId, callback) => {
  const storyKeyVersion = buildKeyVersion(storyKey, version);
  const params = {
    TableName: tableName,
    Key: {
      "storyKeyVersion": storyKeyVersion,
      "id": chapterId
    }
  };
  const promise = docClient.get(params).promise();
  promise.then(
    data => {
      callback(mapChapterItemToApi(data.Item));
    },
    error => {
      console.log('error:', error);
      console.log('params used:', params);
      callback(null);
    }
  )
};

exports.selectDraftChapter = (storyKey, chapterId, callback) => {
  this.selectChapter(storyKey, -1, chapterId, callback);
};
