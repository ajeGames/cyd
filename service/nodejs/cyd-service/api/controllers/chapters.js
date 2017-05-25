var chaptersDataAccess = require('../persistence/chapters-db');
var logger = require('../helpers/logger');

exports.getChapter = function(req, res) {
  var key = req.swagger.params.key.value;
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
