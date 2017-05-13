'use strict';

var url = require('url');

var Storytime = require('./StorytimeService');

module.exports.createChapter = function createChapter (req, res, next) {
  Storytime.createChapter(req.swagger.params, res, next);
};

module.exports.createStory = function createStory (req, res, next) {
  Storytime.createStory(req.swagger.params, res, next);
};

module.exports.getChapter = function getChapter (req, res, next) {
  Storytime.getChapter(req.swagger.params, res, next);
};

module.exports.getChapters = function getChapters (req, res, next) {
  Storytime.getChapters(req.swagger.params, res, next);
};

module.exports.getStorySummaries = function getStorySummaries (req, res, next) {
  Storytime.getStorySummaries(req.swagger.params, res, next);
};

module.exports.getStorySummary = function getStorySummary (req, res, next) {
  Storytime.getStorySummary(req.swagger.params, res, next);
};

module.exports.patchChapter = function patchChapter (req, res, next) {
  Storytime.patchChapter(req.swagger.params, res, next);
};

module.exports.updateChapter = function updateChapter (req, res, next) {
  Storytime.updateChapter(req.swagger.params, res, next);
};

module.exports.updateStorySummary = function updateStorySummary (req, res, next) {
  Storytime.updateStorySummary(req.swagger.params, res, next);
};
