'use strict';

var url = require('url');

var Clubhouse = require('./ClubhouseService');

module.exports.getFeaturedStories = function getFeaturedStories (req, res, next) {
  Clubhouse.getFeaturedStories(req.swagger.params, res, next);
};

module.exports.getMember = function getMember (req, res, next) {
  Clubhouse.getMember(req.swagger.params, res, next);
};

module.exports.registerMember = function registerMember (req, res, next) {
  Clubhouse.registerMember(req.swagger.params, res, next);
};
