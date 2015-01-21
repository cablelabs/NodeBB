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

var customController = {
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

customController.getpath = function(req, res, next) {
    async.waterfall([
        function (next) {
            var keys = cids.map(function(pid) {
                return 'path:' + pid;
            });

            db.getObjects(keys, function(err, categories) {
                if (err) {
                    return callback(err);
                }

                if (!Array.isArray(categories) || !categories.length) {
                    return callback(null, []);
                }

                async.map(categories, function(category, next) {
                    if (!category) {
                        return next(null, category);
                    }
                    category.name = validator.escape(category.name);
                    category.description = validator.escape(category.description);
                    category.backgroundImage = category.image ? nconf.get('relative_path') + category.image : '';
                    category.disabled = parseInt(category.disabled, 10) === 1;

                    next(null, category);
                }, callback);
            });
            next();
        }
    ], function (err, result) {
        if (err) {
            return next(err);
        }
        res.render('mind-map/index', data);
    });
};

customController.home = function(req, res, next) {
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

customController.documentation = function(req, res, next) {
    res.render('mind-map/documentation');
};

module.exports = customController;
