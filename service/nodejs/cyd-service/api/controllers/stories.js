var storiesDataAccess = require('../persistence/stories-db');
var logger = require('../helpers/logger');

exports.getLatestPublishedStories = function(req, res) {
  console.log(logger.timestamp(), 'getAllPublished');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500);
      res.json(error);
    }
  };
  storiesDataAccess.selectLatestPublishedStories(callback);
};

// TODO implement
exports.createStory = function(req, res) {
  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};

exports.getDraftStory = function(req, res) {
  var key = req.swagger.params.key.value;
  console.log(logger.timestamp(), 'getDraftStory { key:', key,'}');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404);
      res.json(error);
    }
  };
  storiesDataAccess.selectDraftStory(key, callback);
};

// TODO implement
exports.updateStory = function(req, res) {
  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};

exports.getLatestPublishedStory = function(req, res) {
  var key = req.swagger.params.key.value;
  console.log(logger.timestamp(), 'getStory { key:', key,'}');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404);
      res.json(error);
    }
  };
  storiesDataAccess.selectLatestPublishedStory(key, callback);
};

exports.getStoryByVersion = function(req, res) {
  var key = req.swagger.params.key.value;
  var version = req.swagger.params.version.value;
  console.log(logger.timestamp(), 'getStoryByVersion { key:', key, ', version: {', version, '}');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404);
      res.json(error);
    }
  };
  storiesDataAccess.selectStoryByVersion(key, version, callback);
};

// TODO implement
exports.getEntireStory = function(req, res) {

  // chain promises: first get story by version, then get chapters and assemble

  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};