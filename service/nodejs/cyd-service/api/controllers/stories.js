var storiesDataAccess = require('../persistence/stories-db');

exports.getAllPublished = function(req, res) {
  console.log('getAllPublished called at', new Date());
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
  storiesDataAccess.retrieveLatestPublishedStories(callback);
};

exports.getStory = function(req, res) {
  var key = req.swagger.params.key.value;
  console.log('getStory called with key {', key,'} at', new Date());
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
  storiesDataAccess.retrieveLatestPublishedStory(key, callback);
};

exports.getDraftStory = function(req, res) {
  var key = req.swagger.params.key.value;
  console.log('getDraftStory called with key {', key,'} at', new Date());
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
  storiesDataAccess.retrieveDraftStory(key, callback);
}