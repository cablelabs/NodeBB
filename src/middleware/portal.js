"use strict";

var app,
    middleware = {},
    nconf = require('nconf'),
    async = require('async'),
    path = require('path'),
    user = require('./../user'),
    meta = require('./../meta'),
    plugins = require('./../plugins'),
    translator = require('./../../public/src/translator'),

    controllers = {
        api: require('./../controllers/api')
    };


middleware.isAdmin = function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login?next=admin');
    }

    user.isAdministrator((req.user && req.user.uid) ? req.user.uid : 0, function (err, isAdmin) {
        if (err) {
            return next(err);
        }

        if (!isAdmin) {
            res.status(403);
            res.redirect('/403');
        } else {
            next();
        }
    });
};

middleware.buildHeader = function(req, res, next) {
    res.locals.renderHeader = true;
    async.parallel({
        config: function(next) {
            controllers.api.getConfig(req, res, next);
        },
        footer: function(next) {
            app.render('footer', {}, next);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }

        res.locals.config = results.config;

        translator.translate(results.footer, results.config.defaultLang, function(parsedTemplate) {
            res.locals.footer = parsedTemplate;
            next();
        });
    });
};

module.exports = function(webserver) {
    app = webserver;
    return middleware;
};
