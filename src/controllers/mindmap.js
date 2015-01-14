"use strict";

var async = require('async'),

    user = require('../user'),
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

portalController.home = function(req, res, next) {
    async.parallel({
        header: function (next) {
            res.locals.metaTags = [{
                name: "title",
                content: meta.config.title || 'CableLabs'
            }, {
                name: "description",
                content: meta.config.description || ''
            }, {
                property: 'og:title',
                content: 'Index | ' + (meta.config.title || 'CableLabs')
            }, {
                property: 'og:type',
                content: 'website'
            }];

            if(meta.config['brand:logo']) {
                res.locals.metaTags.push({
                    property: 'og:image',
                    content: meta.config['brand:logo']
                });
            }

            next(null);
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('mindmap/home', data);
    });
};

module.exports = mindmapController;
