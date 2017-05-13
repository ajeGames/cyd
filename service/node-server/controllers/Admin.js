'use strict';

var url = require('url');

var Admin = require('./AdminService');

module.exports.clearFeaturedStories = function clearFeaturedStories (req, res, next) {
  Admin.clearFeaturedStories(req.swagger.params, res, next);
};

module.exports.getStatus = function getStatus (req, res, next) {
  Admin.getStatus(req.swagger.params, res, next);
};

module.exports.updateFeaturedStories = function updateFeaturedStories (req, res, next) {
  Admin.updateFeaturedStories(req.swagger.params, res, next);
};
