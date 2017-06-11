const storiesDataAccess = require('../persistence/stories-db');
const logger = require('../helpers/logger');

exports.getLatestPublishedStories = function(req, res) {
  logger.info('stories.getLatestPublishedStories');
  const callback = (data) => {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };
  storiesDataAccess.selectLatestPublishedStories(callback);
};

exports.createStory = function(req, res) {
  logger.info('stories.createStory');
  const payload = req.body;
  const storyData = Object.assign({}, {
    title: payload.title,
    penName: payload.penName,
    tagLine: payload.tagLine,
    about: payload.about,
    firstChapter: 1
  });
  const callback = (data) => {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };
  storiesDataAccess.insertStory(storyData, callback);
};

exports.getDraftStory = function(req, res) {
  const key = req.swagger.params.key.value;
  console.log(logger.timestamp(), 'getDraftStory { key:', key,'}');
  const callback = function(data) {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404).json(error).send();
    }
  };
  storiesDataAccess.selectDraftStory(key, callback);
};

exports.updateStory = function(req, res) {
  const key = req.swagger.params.key.value;
  const update = req.body;

  const afterUpdateCallback = (data) => {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };

  const doUpdateCallback = currentStory => {
    const updatedStory = Object.assign({}, currentStory, update);
    logger.info('updatedStory', JSON.stringify(updatedStory, null, 2));
    storiesDataAccess.insertStory(updatedStory, afterUpdateCallback);
  };

  storiesDataAccess.selectDraftStory(key, doUpdateCallback);
};

exports.getLatestPublishedStory = function(req, res) {
  const key = req.swagger.params.key.value;
  console.log(logger.timestamp(), 'getStory { key:', key,'}');
  const callback = function(data) {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404).json(error).send();
    }
  };
  storiesDataAccess.selectLatestPublishedStory(key, callback);
};

exports.getStoryByVersion = function(req, res) {
  const key = req.swagger.params.key.value;
  const version = req.swagger.params.version.value;
  console.log(logger.timestamp(), 'getStoryByVersion { key:', key, ', version: {', version, '}');
  const callback = function(data) {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404).json(error).send();
    }
  };
  storiesDataAccess.selectStoryByVersion(key, version, callback);
};

// TODO implement
exports.getEntireStory = function(req, res) {

  // chain promises: first get story by version, then get chapters and assemble

  const error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500).json(error).send();
};