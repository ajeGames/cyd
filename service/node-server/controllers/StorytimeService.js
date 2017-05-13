'use strict';

exports.createChapter = function(args, res, next) {
  /**
   * Creates new chapter with given information.
   * Creates a chapter with the information provided, assigning a chapter ID.
   *
   * storyKey String key of story to add chapter to
   * chapter Chapter Chapter information
   * returns Chapter
   **/
  var examples = {};
  examples['application/json'] = {
  "prose" : "aeiou",
  "chapterId" : 123,
  "signpost" : [ {
    "destinationId" : 123,
    "teaser" : "aeiou"
  } ],
  "title" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.createStory = function(args, res, next) {
  /**
   * Creates new story with given information.
   * Creates a story with the information provided, assigning a unique key.
   *
   * story StorySummary Story summary
   * returns StorySummary
   **/
  var examples = {};
  examples['application/json'] = {
  "penName" : "aeiou",
  "publishedAt" : "2000-01-23T04:56:07.000+00:00",
  "tagLine" : "aeiou",
  "storyKey" : "aeiou",
  "about" : "aeiou",
  "firstChapter" : 123,
  "authorId" : "aeiou",
  "title" : "aeiou",
  "version" : 123
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getChapter = function(args, res, next) {
  /**
   * Retrieves chapter with given ID of story with given key.
   * Retrieves chapter with given ID of story with given key.
   *
   * storyKey String unique key of story to retrieve
   * chapterId Integer chapter ID
   * returns Chapter
   **/
  var examples = {};
  examples['application/json'] = {
  "prose" : "aeiou",
  "chapterId" : 123,
  "signpost" : [ {
    "destinationId" : 123,
    "teaser" : "aeiou"
  } ],
  "title" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getChapters = function(args, res, next) {
  /**
   * Gets all of the chapter of given story
   * Gets every chapter of given story.
   *
   * storyKey String key of story to add chapter to
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "prose" : "aeiou",
  "chapterId" : 123,
  "signpost" : [ {
    "destinationId" : 123,
    "teaser" : "aeiou"
  } ],
  "title" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getStorySummaries = function(args, res, next) {
  /**
   * Gets all of the story summaries
   * Gets every story summary. Results might be truncated for paging.
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "penName" : "aeiou",
  "publishedAt" : "2000-01-23T04:56:07.000+00:00",
  "tagLine" : "aeiou",
  "storyKey" : "aeiou",
  "about" : "aeiou",
  "firstChapter" : 123,
  "authorId" : "aeiou",
  "title" : "aeiou",
  "version" : 123
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getStorySummary = function(args, res, next) {
  /**
   * Returns story summary for given key
   * Returns the summary of the story indentified by key.
   *
   * storyKey String unique key of story to retrieve
   * returns StorySummary
   **/
  var examples = {};
  examples['application/json'] = {
  "penName" : "aeiou",
  "publishedAt" : "2000-01-23T04:56:07.000+00:00",
  "tagLine" : "aeiou",
  "storyKey" : "aeiou",
  "about" : "aeiou",
  "firstChapter" : 123,
  "authorId" : "aeiou",
  "title" : "aeiou",
  "version" : 123
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.patchChapter = function(args, res, next) {
  /**
   * Replaces a portion of the chapter
   * Replaces a portion of the chapter -- the prose, the signpost, etc. without touching the rest
   *
   * storyKey String unique key of story to update
   * chapterId Integer chapter ID
   * chapter Chapter Chapter information
   * returns Chapter
   **/
  var examples = {};
  examples['application/json'] = {
  "prose" : "aeiou",
  "chapterId" : 123,
  "signpost" : [ {
    "destinationId" : 123,
    "teaser" : "aeiou"
  } ],
  "title" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateChapter = function(args, res, next) {
  /**
   * Updates chapter with given information.
   * Updates the given chapter of given story.
   *
   * storyKey String unique key of story to update
   * chapterId Integer chapter ID
   * chapter Chapter Chapter information
   * returns Chapter
   **/
  var examples = {};
  examples['application/json'] = {
  "prose" : "aeiou",
  "chapterId" : 123,
  "signpost" : [ {
    "destinationId" : 123,
    "teaser" : "aeiou"
  } ],
  "title" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateStorySummary = function(args, res, next) {
  /**
   * Updates a story summary with given information.
   * Creates a story with the information provided, assigning a unique key.
   *
   * storyKey String unique key of story to update
   * story StorySummary Story summary
   * returns StorySummary
   **/
  var examples = {};
  examples['application/json'] = {
  "penName" : "aeiou",
  "publishedAt" : "2000-01-23T04:56:07.000+00:00",
  "tagLine" : "aeiou",
  "storyKey" : "aeiou",
  "about" : "aeiou",
  "firstChapter" : 123,
  "authorId" : "aeiou",
  "title" : "aeiou",
  "version" : 123
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

