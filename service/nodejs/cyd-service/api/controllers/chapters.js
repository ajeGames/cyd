const chaptersDataAccess = require('../persistence/chapters-db');
const logger = require('../helpers/logger');

// TODO implement
exports.createChapter = (req, res) => {
  logger.info('chapters.createChapter');
  const error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500).json(error).send();
};

exports.getDraftChapter = (req, res) => {
  const key = req.swagger.params.storyKey.value;
  const id = req.swagger.params.id.value;
  logger.info('chapters.getDraftChapter { key:', key, ', id: ', id, '}');
  const doAfter = data => {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '404',
        message: 'Chapter was not found'
      };
      res.status(404).json(error).send();
    }
  };
  chaptersDataAccess.selectDraftChapter(key, id, doAfter);
};

// TODO implement
exports.updateChapter = (req, res) => {
  logger.info('chapters.updateChapter');
  const error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500).json(error).send();
};

// TODO implement
exports.updateSignpost = (req, res) => {
  logger.info('chapters.updateSignpost');
  const error = {
    code: '500',
    message: 'Not implemented'
  };
  res.status(500).json(error).send();
};

exports.getChapterByVersion = (req, res) => {
  const key = req.swagger.params.storyKey.value;
  const version = req.swagger.params.version.value;
  const id = req.swagger.params.id.value;
  logger.info('chapters.getChapterByVersion { key:', key, ', version: {', version, ', id: ', id, '}');
  const doAfter = data => {
    if (data) {
      res.json(data).send();
    } else {
      const error = {
        code: '404',
        message: 'Chapter was not found'
      };
      res.status(404).json(error).send();
    }
  };
  chaptersDataAccess.selectChapter(key, version, id, doAfter);
};
