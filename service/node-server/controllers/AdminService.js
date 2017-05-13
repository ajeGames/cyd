'use strict';

exports.clearFeaturedStories = function(args, res, next) {
  /**
   * Clears list of featured stories.
   * Clears list of featured stories.
   *
   * no response value expected for this operation
   **/
  res.end();
}

exports.getStatus = function(args, res, next) {
  /**
   * Gets information about the status of the StoryTime service.
   *
   * returns Status
   **/
  var examples = {};
  examples['application/json'] = {
  "salutation" : "aeiou",
  "version" : "aeiou",
  "status" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateFeaturedStories = function(args, res, next) {
  /**
   * Adds and removes featured stories.
   * Adds and removes featured stories.
   *
   * toAddRemove FeaturedStoryUpdate List of IDs of stories to feature (optional)
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

