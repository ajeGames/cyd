var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing stories into DynamoDB. Please wait.");

function loadChapter(storyKeyVersion, chapter) {
  var params = {
    TableName: "Chapters",
    Item: {
      "storyKeyVersion":  storyKeyVersion,
      "id": chapter.id,
      "title": chapter.title,
      "prose": chapter.prose,
      "signpost": chapter.signpost
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add chapter:", chapter.id);
      console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Put chapter", chapter.id, "succeeded for story", storyKeyVersion);
      console.log(data);
    }
  });
}

var allStories = JSON.parse(fs.readFileSync('sampleStories.json', 'utf8'));

allStories.forEach(function(story) {
  var storyKey = story.key;
  var version = story.version;
  var useVersion = (version < 0) ? 'd' : version;
  var storyKeyVersion = storyKey + '-' + useVersion;
  var summary = story.summary;
  var chapters = story.chapters;

  var params = {
    TableName: "Stories",
    Item: {
      "key":  storyKey,
      "version": version,
      "summary": summary
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to add story:", story.key);
      console.error("Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Put story succeeded for", story.key);
      console.log(data);
    }
  });

  if (chapters && chapters.length > 0) {
    chapters.forEach(function (chapter) {
      loadChapter(storyKeyVersion, chapter);
    });
  }
});
