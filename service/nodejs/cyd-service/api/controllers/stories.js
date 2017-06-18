const storiesDataAccess = require('../persistence/stories-db');
const logger = require('../helpers/logger');

exports.getLatestPublishedStories = (req, res) => {
  logger.info('stories.getLatestPublishedStories');
  const doAfter = data => {
    if (data) {
      res.json(data);
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };
  storiesDataAccess.selectLatestPublishedStories(doAfter);
};

exports.createStory = (req, res) => {
  logger.info('stories.createStory');
  const payload = req.body;
  const storyInfo = {
    title: payload.title,
    penName: payload.penName,
    tagLine: payload.tagLine,
    about: payload.about,
    firstChapter: 1
  };
  const doAfter = data => {
    if (data) {
      res.json(data);
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };
  storiesDataAccess.insertStory(storyInfo, doAfter);
};

exports.getDraftStory = (req, res) => {
  const key = req.swagger.params.key.value;
  logger.info('stories.getDraftStory { key:', key,'}');
  const doAfter = data => {
    if (data) {
      res.json(data);
    } else {
      const error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404).json(error).send();
    }
  };
  storiesDataAccess.selectDraftStory(key, doAfter);
};

exports.updateStory = (req, res) => {
  const key = req.swagger.params.key.value;
  const update = req.body;
  logger.info('stories.updateStory { key:', key,'} update:', update);
  const doAfterUpdate = data => {
    if (data) {
      res.json({
        success: 200,
        description: `Updated story ${key}`
      });
    } else {
      const error = {
        code: '500',
        message: 'There was a problem that is beyond your control.  Contact customer support.'
      };
      res.status(500).json(error).send();
    }
  };
  const doAfterGet = currentStory => {
    const updatedStory = Object.assign({}, currentStory, update);
    logger.info('currentStory', JSON.stringify(currentStory, null, 2));
    logger.info('updatedStory', JSON.stringify(updatedStory, null, 2));
    storiesDataAccess.insertStory(updatedStory, doAfterUpdate);
  };
  storiesDataAccess.selectDraftStory(key, doAfterGet);
};

exports.getLatestPublishedStory = (req, res) => {
  const key = req.swagger.params.key.value;
  logger.info('stories.getLatestPublishedStory { key:', key,'}');
  const doAfter = data => {
    if (data) {
      res.json(data);
    } else {
      const error = {
        code: '404',
        message: 'Story was not found for key: ' + key
      };
      res.status(404).json(error).send();
    }
  };
  storiesDataAccess.selectLatestPublishedStory(key, doAfter);
};

exports.getStoryByVersion = (req, res) => {
  const key = req.swagger.params.key.value;
  const version = req.swagger.params.version.value;
  logger.info('stories.getStoryByVersion { key:', key, ', version:', version, '}');
  if (version === 'latest') {
    this.getLatestPublishedStory(req, res);
    return;
  }
  const doAfter = data => {
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
  storiesDataAccess.selectStoryByVersion(key, version, doAfter);
};

// TODO implement
exports.getEntireStory = (req, res) => {
  const key = req.swagger.params.key.value;
  const version = req.swagger.params.version.value;
  logger.info('stories.getEntireStory { key:', key, ', version: {', version, '}');

  // chain promises: first get story by version, then get chapters and assemble

  const error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500).json(error).send();
};