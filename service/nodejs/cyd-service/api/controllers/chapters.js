var chaptersDataAccess = require('../persistence/chapters-db');
var logger = require('../helpers/logger');

// TODO implement
exports.createChapter = function(req, res) {
  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};

exports.getDraftChapter = function(req, res) {
  var key = req.swagger.params.storyKey.value;
  var id = req.swagger.params.id.value;

  console.log(logger.timestamp(), 'getChapter { key:', key, ', id: ', id, '}');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '404',
        message: 'Chapter was not found'
      };
      res.status(404);
      res.json(error);
    }
  };
  chaptersDataAccess.selectDraftChapter(key, id, callback);
};

// TODO implement
exports.updateChapter = function(req, res) {
  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};

// TODO implement
exports.updateSignpost = function(req, res) {
  var error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500);
  res.json(error);
};

exports.getChapterByVersion = function(req, res) {
  var key = req.swagger.params.storyKey.value;
  var version = req.swagger.params.version.value;
  var id = req.swagger.params.id.value;

  console.log(logger.timestamp(), 'getChapter { key:', key, ', version: {', version, ', id: ', id, '}');
  var callback = function(data) {
    if (data) {
      res.json(data);
    } else {
      var error = {
        code: '404',
        message: 'Chapter was not found'
      };
      res.status(404);
      res.json(error);
    }
  };
  chaptersDataAccess.selectChapter(key, version, id, callback);
};
