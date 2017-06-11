const AWS = require("aws-sdk");
const logger = require('../helpers/logger');

const initAWSConnection = () => {
  AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
  return {
    db: new AWS.DynamoDB(),
    docClient: new AWS.DynamoDB.DocumentClient()
  }
};

exports.initAWSConnection = initAWSConnection;

exports.dropTables = tablesToDrop => {
  logger.info('dropAllTables');
  const { db } = initAWSConnection();
  tablesToDrop.forEach(table => {
    const params = {
      TableName: table
    };
    db.deleteTable(params, (err, data) => {
      if (err) {
        logger.error("Unable to delete table.", JSON.stringify(err, null, 2));
      } else {
        logger.info("Deleted table.", JSON.stringify(data, null, 2));
      }
    });
  });
};

exports.createTable = tableParams => {
  logger.info('createTable');
  const { db } = initAWSConnection();
  db.createTable(tableParams, (err, data) => {
    if (err) {
      logger.error("Unable to create table.", JSON.stringify(err, null, 2));
    } else {
      logger.info("Created table.", JSON.stringify(data, null, 2));
    }
  });
};

const loadChapter = (docClient, storyKey, version, chapter) => {
  const useVersion = (version < 0) ? 'd' : version;
  const storyKeyVersion = storyKey + '-' + useVersion;
  const params = {
    TableName: "Chapters",
    Item: {
      "storyKeyVersion":  storyKeyVersion,
      "id": chapter.id,
      "title": chapter.title,
      "prose": chapter.prose,
      "signpost": chapter.signpost
    }
  };
  docClient.put(params, err => {
    if (err) {
      logger.error("Unable to add chapter", chapter.id, 'to story', storyKeyVersion);
      logger.error(err);
    } else {
      logger.info('loadChapter', chapter.id, 'succeeded for', storyKeyVersion);
    }
  });
};

exports.loadFullStory = story => {
  const key = story.key;
  const version = story.version;
  const chapters = story.chapters;
  const params = {
    TableName: 'Stories',
    Item: {
      'key': key,
      'version': version,
      'author': story.author,
      'summary': story.summary
    }
  };
  const { docClient } = initAWSConnection();
  docClient.put(params, err => {
    if (err) {
      logger.error('Unable to add story:', key);
      logger.error(err);
    } else {
      logger.info('loadFullStory', 'Put story succeeded for', key);
    }
  });
  if (chapters && chapters.length > 0) {
    chapters.forEach(chapter => loadChapter(docClient, key, version, chapter));
  }
};
