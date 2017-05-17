var storiesDataAccess = require('../persistence/stories-db');

exports.getStory = function(req, res) {
  console.log('getStory called at', new Date());
  var key = req.swagger.params.key.value;
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
