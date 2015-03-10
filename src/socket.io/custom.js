'use strict';

//var	async = require('async'),
//    nconf = require('nconf'),
//    user = require('../user'),
//    groups = require('../groups'),
//    topics = require('../topics'),
//    posts = require('../posts'),
//    notifications = require('../notifications'),
//    messaging = require('../messaging'),
//    plugins = require('../plugins'),
//    utils = require('../../public/src/utils'),
//    websockets = require('./index'),
//    meta = require('../meta'),

var linkParser = require('../controllers/mind-map/linkParser_new-format'),
    swaggerBuilder = require('../modeling/swaggerBuilder');

var SocketCustom = {};

SocketCustom.refreshLinkParser = function(socket, sets, callback) {
    if (!socket.uid) {
        return callback(new Error('[[invalid-uid]]'));
    }
    linkParser.init(function(err) {
        callback(null, '{"message": "Refreshed Link Parser"}');
    });
};

SocketCustom.refreshSwagger = function(socket, data, callback) {
    if (!socket.uid) {
        return callback(new Error('[[invalid-uid]]'));
    }
    swaggerBuilder.init(function(err) {
        callback(null, '{"message": "Refreshed Swagger File"}');
    });
};

/* Exports */

module.exports = SocketCustom;
