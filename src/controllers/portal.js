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



var portalController = {
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
        },
        apis: function (next) {
            var uid = req.user ? req.user.uid : 0;
            apis.getVisibleApis(uid, function (err, apiData) {
                if (err) {
                    return next(err);
                }

                function getRecentReplies(category, callback) {
                    callback();
                }

                async.each(apiData, getRecentReplies, function (err) {
                    next(err, apiData);
                });
            });
        },
        announcements: function (next) {
        var uid = req.user ? req.user.uid : 0;
        announcements.getVisibleAnnouncements(uid, function (err, announcementData) {
            if (err) {
                return next(err);
            }

            function getRecentReplies(category, callback) {
                callback();
            }

            async.each(announcementData, getRecentReplies, function (err) {
                next(err, announcementData);
            });
        });
    }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('portal/home', data);
    });
};

portalController.api = function(req, res, next) {
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
        },
        apis: function (next) {
            var uid = req.user ? req.user.uid : 0;
            apis.getVisibleApis(uid, function (err, apiData) {
                if (err) {
                    return next(err);
                }

                function getRecentReplies(category, callback) {
                        callback();
                }

                async.each(apiData, getRecentReplies, function (err) {
                    next(err, apiData);
                });
            });
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('portal/api', data);
    });
};

portalController.announcement = function(req, res, next) {
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
        },
        announcements: function (next) {
            var uid = req.user ? req.user.uid : 0;
            announcements.getVisibleAnnouncements(uid, function (err, apiData) {
                if (err) {
                    return next(err);
                }

                function getRecentReplies(category, callback) {
                    callback();
                }

                async.each(apiData, getRecentReplies, function (err) {
                    next(err, apiData);
                });
            });
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('portal/announcement', data);
    });
};

portalController.console = function(req, res, next) {
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
        },
        api: function (next) {
            var uid = req.user ? req.user.uid : 0;
            apis.getVisibleApis(uid, function (err, apiData) {
                if (err) {
                    return next(err);
                }

                function getRecentReplies(category, callback) {
                    callback();
                }

                async.each(apiData, getRecentReplies, function (err) {
                    next(err, apiData);
                });
            });
        }
    }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('portal/home', data);
    });
};

portalController.proxy = function(req, res, next) {
    console.log("URL : " + req.originalUrl);

//    req.origi nalUrl

    res.send('{"Status" : "Success"}');

};

module.exports = portalController;
