"use strict";

var async = require('async'),

    user = require('../user'),
    winston = require('winston'),
    apis = require('../apis'),
    announcements = require('../announcements'),
    topics = require('../topics'),
    meta = require('../meta'),
    db = require('../database'),
    events = require('../events'),
    languages = require('../languages'),
    plugins = require('../plugins'),
    widgets = require('../widgets'),
    groups = require('../groups'),
    pkg = require('../../package.json'),
    validator = require('validator');

var mindmapController = {
    categories: {},
    topics: {},
    groups: {},
    themes: {},
    events: {},
    database: {},
    plugins: {},
    languages: {},
    settings: {},
    logger: {},
    sounds: {},
    users: require('./admin/users'),
    uploads: require('./admin/uploads')
};

mindmapController.home = function(req, res, next) {
    async.waterfall([
        function (next) {
            // Refreshing link.json for mind-map
            var linkparser = require('../controllers/mind-map/linkParser');
            linkparser.init(function(err){
                if(err) {
                    winston.error('Error Processing links.json for mindmap: ' + err);
                } else {
                    winston.info("MIND MAP:: Refreshed links.json file");
                }
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index');
    });
};

module.exports = mindmapController;
