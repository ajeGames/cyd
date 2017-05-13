'use strict';

exports.getFeaturedStories = function(args, res, next) {
  /**
   * Gets a list of featured story IDs.
   * Gets a list of featured story IDs. Default list is empty.
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ "aeiou" ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getMember = function(args, res, next) {
  /**
   * Gets member information
   * Gets public member information
   *
   * memberId String ID of the member
   * returns Member
   **/
  var examples = {};
  examples['application/json'] = {
  "communicationOkay" : true,
  "joinedAt" : "2000-01-23T04:56:07.000+00:00",
  "screenName" : "aeiou",
  "id" : "aeiou",
  "identityProvider" : "aeiou",
  "email" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.registerMember = function(args, res, next) {
  /**
   * Creates a new member of the Clubhouse.
   *
   * member Member Member information
   * returns Member
   **/
  var examples = {};
  examples['application/json'] = {
  "communicationOkay" : true,
  "joinedAt" : "2000-01-23T04:56:07.000+00:00",
  "screenName" : "aeiou",
  "id" : "aeiou",
  "identityProvider" : "aeiou",
  "email" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

