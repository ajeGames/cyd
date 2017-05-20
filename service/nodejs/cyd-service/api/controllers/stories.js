var storiesDataAccess = require('../persistence/stories-db');

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
  storiesDataAccess.retrievePublishedStory(key, callback);
};
